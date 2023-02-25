import { intro } from '@clack/prompts'
import { cac } from 'cac'
import { version } from '../../package.json'
import { authCommand, projectCommand } from './commands'

const cli = cac('create-vite-vercel')

export function run() {
  intro('create-vite-vercel')
  // note(version)

  cli.command('project', 'create vite project')
    .action(projectCommand)
  cli.command('auth', 'save github auth token')
    .action(authCommand)

  cli.help()
  cli.version(version)
  cli.parse()
}
