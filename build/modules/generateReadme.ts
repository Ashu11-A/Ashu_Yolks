import { exist } from "build/libs/exist.js";
import { timestamp } from "build/libs/time.js";
import { JobsData } from "build/types/github.js";
import { readFile, writeFile } from "fs/promises";
import { exec as execAsync } from "child_process"; // Importação nova
import { promisify } from "util"; // Importação nova

const exec = promisify(execAsync);

// Função para pegar o tamanho da imagem via Docker CLI
async function getImageSize(image: string): Promise<string> {
  try {
    // -v traz o JSON detalhado com as layers e arquiteturas
    const { stdout } = await exec(`docker manifest inspect -v ${image}`);
    const data = JSON.parse(stdout);

    // Se for uma lista (multi-arch), procura amd64, senão pega o primeiro
    let manifest;
    if (Array.isArray(data)) {
      manifest = data.find((m: any) => m.Descriptor?.platform?.architecture === 'amd64') || data[0];
    } else {
      manifest = data;
    }

    if (!manifest) {
      return 'Unknown';
    }

    // Tenta diferentes caminhos na estrutura JSON (OCI primeiro, depois Docker v2, depois direto)
    let layers: any[] = [];
    
    if (manifest.OCIManifest?.layers) {
      layers = manifest.OCIManifest.layers;
    } else if (manifest.SchemaV2Manifest?.layers) {
      layers = manifest.SchemaV2Manifest.layers;
    } else if (manifest.layers) {
      layers = manifest.layers;
    } else if (manifest.Manifest?.layers) {
      layers = manifest.Manifest.layers;
    }

    if (layers.length === 0) {
      return 'Unknown';
    }

    // Soma o tamanho das layers
    const sizeBytes = layers.reduce((acc: number, layer: any) => {
      const layerSize = layer.size || 0;
      return acc + layerSize;
    }, 0);

    if (sizeBytes === 0) {
      return 'Unknown';
    }

    // Converte bytes para Mebibytes (MiB)
    const sizeMiB = sizeBytes / (1024 * 1024);
    return `${sizeMiB.toFixed(2)} MiB`;
  } catch (error: any) {
    // Caso a imagem não exista ou dê erro no comando
    // Log do erro apenas em modo debug (pode ser removido em produção)
    if (process.env.DEBUG) {
      console.error(`Erro ao obter tamanho de ${image}:`, error.message);
    }
    return 'Pending';
  }
}

export async function generate (id: string) {
  console.log(`Generating Readme for Run ID: ${id}`)
  const readme = await readFile('README.md', { encoding: 'utf-8' })
  const cache = await exist('cache.build.json') ? JSON.parse(await readFile('cache.build.json', { encoding: 'utf-8' })) : {}

  const request = await fetch(`https://api.github.com/repos/Ashu11-A/Ashu_Yolks/actions/runs/${id}/jobs`, { method: 'GET' })
  const builds = await request.json() as JobsData
  
  const dockers: Record<string, string[]> = cache
  
  for (const job of builds.jobs) {
    if (job.name.includes('Get all')) continue
    if (job.name.includes('Generate Readme.md')) continue

    const time = timestamp(job.started_at, job.completed_at)
    const sucess = job.conclusion === 'success'
    
    // Parse seguro do nome do job
    let metaData;
    try {
        metaData = JSON.parse(job.name) as { type: string, tag: string, arch: string, path: string };
    } catch (e) {
        continue;
    }
    
    const { type, tag, arch, path } = metaData;
    const imageName = `ghcr.io/ashu11-a/${type}:${tag}`;
    
    // Busca o peso da imagem (apenas se o build foi sucesso)
    const size = sucess ? await getImageSize(imageName) : 'N/A';

    // Adicionado coluna de Size (MiB)
    const text = `| [${tag}](https://github.com/Ashu11-A/Ashu_Yolks/tree/main/${path}) | ${arch.includes('amd') ? '✅' : '❌'} | ${arch.includes('arm') ? '✅' : '❌'} | ${sucess ? '✅' : '❌'} | ${time} | ${size} | ${imageName}`

    if (!Array.isArray(dockers[type])) dockers[type] = []
    const index = dockers[type].findIndex((value) => value.includes(tag)) // Procura apenas pela tag para evitar duplicatas

    if (index !== -1) {
      dockers[type][index] = text
      continue
    }
    dockers[type].push(text)
  }

  await writeFile('cache.build.json', JSON.stringify(dockers, null, 2), { encoding: 'utf-8' })

  let text = ''

  for (const [key, data] of Object.entries(dockers)) {
    text += '\n'
    text += `## ${key.charAt(0).toUpperCase() + key.slice(1)}\n`
    // Cabeçalho atualizado com Size (MiB)
    text += '| Service | AMD64 | ARM64 | Build Success | Build Time | Size (MiB) | Docker\n'
    text += '|--|--|--|--|--|--|--|\n'
    text += data.join('\n')
  }

  // Gera o novo conteúdo
  const newContent = `\n${text}\n\nLast update: ${new Date().toLocaleString()}\n`;
  
  // Usa os marcadores <!--start-docker--> e <!--end-docker--> para substituir o conteúdo gerado
  const startMarker = '<!--start-docker-->';
  const endMarker = '<!--end-docker-->';
  
  const startIndex = readme.indexOf(startMarker);
  const endIndex = readme.indexOf(endMarker);
  
  let newReadme: string;
  if (startIndex !== -1 && endIndex !== -1) {
    // Substitui o conteúdo entre os marcadores
    const beforeContent = readme.substring(0, startIndex + startMarker.length);
    const afterContent = readme.substring(endIndex);
    newReadme = `${beforeContent}${newContent}${afterContent}`;
  } else if (startIndex !== -1) {
    // Se só encontrar o marcador de início, substitui tudo a partir daí
    const beforeContent = readme.substring(0, startIndex + startMarker.length);
    newReadme = `${beforeContent}${newContent}\n${endMarker}`;
  } else {
    // Se não encontrar os marcadores, tenta encontrar a primeira seção ##
    const firstSectionIndex = readme.indexOf('\n## ');
    if (firstSectionIndex !== -1) {
      const beforeContent = readme.substring(0, firstSectionIndex);
      newReadme = `${beforeContent}\n${startMarker}${newContent}${endMarker}`;
    } else {
      // Último recurso: adiciona no final
      newReadme = `${readme.trim()}\n${startMarker}${newContent}${endMarker}`;
    }
  }
    
  await writeFile('README.md', newReadme)
}