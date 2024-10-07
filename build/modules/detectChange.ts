import { readFile, writeFile } from 'fs/promises'
import { glob } from 'glob'
import path, { basename, join } from 'path'
import { simpleGit } from 'simple-git'
import { exist } from '../libs/exist.js'

const rootPath = process.cwd()
const git = simpleGit(rootPath)

const patterns = ['**/*.sh', '**/Dockerfile'];
const paths = (await glob(patterns, { cwd: join(rootPath, 'dockers'), ignore: ['legacy/**', '**/Arquive*/**'] })).map((path) => join('dockers', path))

// Extract directories and remove duplicates
const formattedPaths = [...new Set(paths.map(path.dirname))]

const modifiedFolders = []
for (const path of formattedPaths) {
  const changed = await git.diff({ '--name-only': null, 'HEAD^': null, 'HEAD': null, [path]: null })

  function getTag(path: string) {
    // If the path is numerous, return a folder afterwards
    if (!Number.isNaN(Number(basename(path)))) { return getTag(join(path, '..')) }

    // If the path has arm64 or amd64 in the name, return a folder afterwards
    if (path.toLowerCase().includes('amd') || path.toLowerCase().includes('arm')) { return getTag(join(path, '..')) }
    return path
  }

  function getType(path: string) {
    return path.split('/')[1]
  }

  if (await exist(join(path, 'Dockerfile'))) {
    if (changed.length > 0) console.log(`🔎 detected changes in docker: ${path}`)
    try {
      const archs = JSON.parse(await readFile(`${path}/metadata.json`, { encoding: 'utf-8' }))
      modifiedFolders.push(Object.assign({
        changed: changed.length > 0,
        path,
        type: getType(path),
        // if path: node/19 then: node_19
        // or path: samp/amd64 then: samp_amd64
        tag: basename(getTag(path)) === basename(path) ? basename(path) : `${basename(getTag(path))}_${basename(path)}`,
      }, archs))
    } catch (error) {
      console.log(error)
    }
  }
}

console.log(modifiedFolders)

await writeFile('metadata.json', JSON.stringify(modifiedFolders, null, 2))