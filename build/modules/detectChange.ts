import { readFile, writeFile } from 'fs/promises'
import { glob } from 'glob'
import path, { basename, join } from 'path'
import { simpleGit } from 'simple-git'
import { exist } from '../libs/exist.js'

const rootPath = process.cwd()
const git = simpleGit(rootPath)

const patterns = ['**/*.sh', '**/Dockerfile'];
const paths = (await glob(patterns, { cwd: join(rootPath, 'dockers'), ignore: ['legacy/**', '**/Arquive*/**'] })).map((path) => join('dockers', path))

// Extrai diretórios e remove duplicatas
const formattedPaths = [...new Set(paths.map(path.dirname))]

const modifiedFolders = []
for (const dirPath of formattedPaths) {
  const changed = await git.diff({ '--name-only': null, 'HEAD^': null, 'HEAD': null, [dirPath]: null })

  function getTag(currentPath: string): string {
    const base = basename(currentPath)
    
    // Se o caminho for numérico, retorna a pasta anterior
    if (!Number.isNaN(Number(base))) { 
      return getTag(join(currentPath, '..')) 
    }

    // Se o caminho tiver arm64 ou amd64 no nome, retorna a pasta anterior
    if (base.toLowerCase().includes('amd') || base.toLowerCase().includes('arm')) { 
      return getTag(join(currentPath, '..')) 
    }
    return currentPath
  }

  function getType(currentPath: string) {
    return currentPath.split('/')[1]
  }

  if (await exist(join(dirPath, 'Dockerfile'))) {
    if (changed.length > 0) console.log(`🔎 detected changes in docker: ${dirPath}`)
    try {
      const archs = JSON.parse(await readFile(`${dirPath}/metadata.json`, { encoding: 'utf-8' }))
      
      const parentTag = basename(getTag(dirPath))
      const currentName = basename(dirPath)
      
      // Lógica condicional:
      // Apenas aplica a regra "pai_filho" se estiver dentro da pasta 'yolks'
      // E se o getTag encontrou um pai diferente do atual (ex: versionamento)
      const isYolks = dirPath.includes('yolks')
      const isNested = parentTag !== currentName
      const finalTag = (isYolks && isNested) ? `${parentTag}_${currentName}` : currentName

      modifiedFolders.push(Object.assign({
        changed: changed.length > 0,
        path: dirPath,
        type: getType(dirPath),
        tag: finalTag,
      }, archs))
    } catch (error) {
      console.log(error)
    }
  }
}

console.log(modifiedFolders)

await writeFile('metadata.json', JSON.stringify(modifiedFolders, null, 2))