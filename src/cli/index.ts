import { intro, note, text } from '@clack/prompts'
import { cac } from 'cac'
import { version } from '../../package.json'
// import { createRepository, getRepository } from '../server/git'
import { saveUserAuth, vite } from '../utils'

const cli = cac('create-vite-vercel')

export function run() {
  intro('create-vite-vercel')
  // note(version)

  cli.command('project', 'create vite project')
    .action(async () => {
      note('create project')

      // const name = await text({
      //   message: 'Text the project name',
      // })

      vite()
      // createRepository(name as string)
      // getRepository()
    })
  cli.command('auth', 'save github auth token')
    .action(async () => {
      note('im auth')
      const auth = await text({
        message: 'Paste your github auth token',
      })
      await saveUserAuth(auth as string)
    })

  cli.help()
  cli.version(version)
  cli.parse()
}
