import { note, text } from '@clack/prompts'
import { createViteProject, pushProject } from '../../utils'
import { createGithubRepository, createNewVercelProject, getVercelProjectUrl } from '../../server'

interface IProjectCommand {
  github?: boolean
  vercel?: boolean
}

export async function projectCommand(options: IProjectCommand) {
  note('create project', 'tips')

  const name = await text({
    message: 'Text the project name',
  })
  await createViteProject(name as string)

  if (options.github) {
    const repositoryUrl = await createGithubRepository(name as string)
    pushProject(name as string, repositoryUrl)
  }

  if (options.github && options.vercel) {
    createNewVercelProject(name as string)
    setTimeout(() => {
      getVercelProjectUrl(name as string)
    }, 5000)
  }
}
