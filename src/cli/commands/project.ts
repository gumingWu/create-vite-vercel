import { note, text } from '@clack/prompts'
import { createViteProject, pushProject } from '../../utils'
import { createGithubRepository, createNewVercelProject, getVercelProjectUrl } from '../../server'

export async function projectCommand() {
  note('create project')

  const name = await text({
    message: 'Text the project name',
  })
  await createViteProject(name as string)

  const repositoryUrl = await createGithubRepository(name as string)

  pushProject(name as string, repositoryUrl)

  createNewVercelProject(name as string)
  setTimeout(() => {
    getVercelProjectUrl(name as string)
  }, 5000)
}
