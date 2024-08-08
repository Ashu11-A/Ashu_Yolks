import { Arg } from "build/types/args.js";

interface ArgsOptions {
    args: Arg[]
}

export class Args {
  public args: Arg[]

  constructor({ args }: ArgsOptions) {
    this.args = args
  }

  validate(input: string[]) {
    for (const arg of input.filter((arg) => arg.includes('-'))) {
      const allArgs = this.args.flatMap(({ command, alias }) => [command, ...alias.map((alia) => alia || command)])
      if (!allArgs.includes(arg)) throw new Error(`Not found arg ${arg}, try --help`)
    }
  }

  formatAliasToCommand(input: string[]): Arg[] {
    const newArgs: Array<Arg> = []

    for (let argIndex = 0; argIndex < input.length; argIndex++) {
      for (const arg of this.args) {
        if (arg.alias.includes(input[argIndex]) || input[argIndex] === arg.command) {
          if (arg?.hasString) {
            // caso a proxima arg seja não seja uma strings, e sim uma arg
            if (input[argIndex + 1]?.startsWith('-')) {
              newArgs.push(arg)
              continue
            }
            ++argIndex
            newArgs.push({ ...arg, string: input[argIndex] })
            continue
          }
          newArgs.push(arg)
          continue
        }
      }
    }

    return newArgs
  }

  quickSort (args: Arg[]): Arg[] {
    if (args.length <= 1) return args

    // Seleciona um elemento como pivô (o elemento pivo será usado como comparação)
    const pivo = args[0]
    const maior = []
    const menor = []

    for (let int = 1; int < args.length; int++) {
      // Se o elemento atual for maior que o pivô
      if (args[int].rank > pivo.rank) {
        maior.push(args[int])
        continue
      }
      menor.push(args[int])
    }

    // Concatena recursivamente as arrays ordenadas menor + pivô + maior
    return this.quickSort(menor).concat(pivo, maior)
  }

  async run(input: string[]) {
    this.validate(input)

    const args = this.quickSort(this.formatAliasToCommand(input))
    for (const arg of args) {
      console.log(`Running ${arg.command}`)
      await arg.function(arg.string)
    }
  }
}