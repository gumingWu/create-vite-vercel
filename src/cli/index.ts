import { intro, note, outro } from '@clack/prompts'
import { cac } from 'cac'
import { lightCyan, lightGreen } from 'kolorist'
import { version } from '../../package.json'
import { projectCommand, tokenCommand } from './commands'

const cli = cac('create-vite-vercel')

export function run() {
  cli.command('[default]', 'create-vite-vercel usage')
    .action(() => {
      intro(lightCyan('create-vite-vercel'))

      note('please follow the cli document to use\n中文文档:\n英文文档:', 'tips')

      outro(lightGreen('finish'))
    })
  cli.command('project', 'create vite project')
    .option('--no-github', 'just create vite project without pushing github')
    .option('--no-vercel', 'just create vite project and push github without pushing vercel')
    .action(() => {
      intro(lightCyan('create-vite-vercel'))
    })
    .action(projectCommand)
  cli.command('token', 'save github and vercel token')
    .option('--no-github', 'do not save github token')
    .option('--no-vercel', 'do not save vercel token')
    .action(() => {
      intro(lightCyan('create-vite-vercel'))
    })
    .action(tokenCommand)

  cli.help()
  cli.version(version)
  cli.parse()
}
