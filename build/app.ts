import { Args } from "./class/args.js";
import { generate } from "./modules/generateReadme.js";

const args = process.argv.slice(2).map((arg) => arg.replace('--', ''));

(async () => {
  new Args({
    args: [
      {
        command: 'detect-change',
        alias: ['-d'],
        rank: 0,
        function: async () => void await import('build/modules/detectChange.js')
      },
      {
        command: 'generate-readme',
        alias: ['-r'],
        hasString: true,
        rank: 0,
        function: async (content) => generate(content as string)
      }
    ]
  }).run(args)
})()