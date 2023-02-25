import { note, text } from '@clack/prompts'
import { pushProject, vite } from '../../utils'
import { createRepository } from '../../server/git'

export async function projectCommand() {
  note('create project')

  const name = await text({
    message: 'Text the project name',
  })
  await vite(name as string)

  const repositoryUrl = await createRepository(name as string)
  pushProject(name as string, repositoryUrl)
}
