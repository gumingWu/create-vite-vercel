import { spinner } from '@clack/prompts'
import { useOFetch } from './index'

const spinnerInstance = spinner()

export async function createNewVercelProject(projectName: string) {
  spinnerInstance.start('Starting create vercel project')
  const tokenFetch = await useOFetch()
  await tokenFetch('/v9/projects?teamId=', {
    method: 'post',
    body: {
      name: projectName,
      framework: 'vite',
      gitRepository: {
        repo: projectName,
        type: 'github',
      },
    },
  })
  // console.log(res)
  spinnerInstance.stop('Create vercel project successfully')
}

export async function getVercelProjectUrl(name: string) {
  spinnerInstance.start('Fetching vercel project url')

  const tokenFetch = await useOFetch()
  const res = await tokenFetch(`/v9/projects/${name}/domains`)
  const url = res.domains[0].name

  spinnerInstance.stop(`Fetching vercel project url successfully, url: ${url}`)
}
