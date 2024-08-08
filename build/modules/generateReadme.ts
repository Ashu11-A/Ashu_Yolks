import { exist } from "build/libs/exist.js";
import { timestamp } from "build/libs/time.js";
import { JobsData } from "build/types/github.js";
import { readFile, writeFile } from "fs/promises";

export async function generate (id: string) {
  console.log(id)
  const readme = await readFile('README.md', { encoding: 'utf-8' })
  const cache = await exist('cache.build.json') ? JSON.parse(await readFile('cache.build.json', { encoding: 'utf-8' })) : {}
  const regex = /<!--start-docker-->[\s\S]*?<!--end-docker-->/g;

  const request = await fetch(`https://api.github.com/repos/Ashu11-A/Ashu_Yolks/actions/runs/${id}/jobs`, { method: 'GET' })
  const builds = await request.json() as JobsData
  
  const dockers: Record<string, string[]> = cache
  for (const job of builds.jobs) {
    if (job.name.includes('Get all')) continue
    if (job.name.includes('Generate Readme.md')) continue


    const time = timestamp(job.started_at, job.completed_at)
    const sucess = job.conclusion === 'success' ? true : false
    const { type, tag, arch, path } = JSON.parse(job.name) as { type: string, tag: string, arch: string, path: string }
    const text = `| [${tag}](https://github.com/Ashu11-A/Ashu_Yolks/tree/main/${path}) | ${arch.includes('amd') ? '✅' : '❌'} | ${arch.includes('arm') ? '✅' : '❌'} | ${sucess ? '✅' : '❌'} | ${time} | ghcr.io/ashu11-a/${type}:${tag}`

    if (!Array.isArray(dockers[type])) dockers[type] = []
    const index = dockers[type].findIndex((value) => value.includes(tag))

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
    text += '| Service | AMD64 | ARM64 | Build Success | Build Time | Docker\n'
    text += '|--|--|--|--|--|--|\n'
    text += data.join('\n')
  }

  const newReadme = readme.replace(regex, `<!--start-docker-->\n${text}\n\nLast update: ${new Date().toLocaleString()}\n<!--end-docker-->`)
  await writeFile('README.md', newReadme)
}