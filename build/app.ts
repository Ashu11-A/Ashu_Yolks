import { readFile, writeFile } from 'fs/promises'
import { glob } from 'glob'
import path, { basename, join } from 'path'
import { simpleGit } from 'simple-git'
import { exist } from './libs/exist.js'

const rootPath = process.cwd()
const git = simpleGit(rootPath)

const patterns = ['**/*.sh', '**/Dockerfile'];
const paths = (await glob(patterns, { cwd: join(rootPath, 'dockers'), ignore: ['legacy/**', '**/Arquive*/**'] })).map((path) => join('dockers', path))

// Extract directories and remove duplicates
const formattedPaths = [...new Set(paths.map(path.dirname))]

const modifiedFolders = []
for (const path of formattedPaths) {
    const changed = await git.diff({ '--name-only': null, 'HEAD^': null, 'HEAD': null, [path]: null })

    function format(path: string) {
        // If the path is numerous, return a folder afterwards
        if (!Number.isNaN(Number(basename(path)))) { return format(join(path, '..')) }

        // If the path has arm64 or amd64 in the name, return a folder afterwards
        if (path.toLowerCase().includes('amd') || path.toLowerCase().includes('arm')) { return format(join(path, '..')) }
        return path
    }

    if (changed.length > 0 && await exist(join(path, 'Dockerfile'))) {
        console.log(`🔎 detected changes in docker: ${path}`)
        const archs = JSON.parse(await readFile(`${path}/metadata.json`, { encoding: 'utf-8' }))
        modifiedFolders.push(Object.assign({
            path,
            // if path: node/19 then: node_19
            // or path: samp/amd64 then: samp_amd64
            tag: basename(format(path)) === basename(path) ? basename(path) : `${basename(format(path))}_${basename(path)}`,
        }, archs))
    }
}

await writeFile('metadata.json', JSON.stringify(modifiedFolders, null, 2))