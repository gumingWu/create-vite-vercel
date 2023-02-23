import { spinner } from '@clack/prompts'
import type { OctokitResponse } from '@octokit/types'
import { useOctokit } from './index'

const spinnerInstance = spinner()

export async function createRepository(name: string) {
  spinnerInstance.start('Starting create repository')

  const octokit = await useOctokit()

  const res = await octokit.request('POST /user/repos', {
    name,
  }).catch((err) => {
    spinnerInstance.stop(`Create repository fail: ${err.message}`)
  })

  spinnerInstance.stop(`Create repository successfully, url: ${(res as OctokitResponse<any>).data.html_url}`)
}

export async function getRepository() {
  spinnerInstance.start('Getting repository')

  const octokit = await useOctokit()
  const res = await octokit.request('GET /repos/{owner}/{repo}', {
    owner: 'gumingWu',
    repo: 'wiew-ui',
  })

  // console.log(res)

  spinnerInstance.stop('Get repository successfully')
}
