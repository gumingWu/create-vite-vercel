import { spinner } from '@clack/prompts'
import type { OctokitResponse } from '@octokit/types'
import { useOctokit } from './index'

const spinnerInstance = spinner()

export function createRepository(name: string) {
  return new Promise<string>(async (resolve) => {
    spinnerInstance.start('Starting create repository')

    const octokit = await useOctokit()

    const res = await octokit.request('POST /user/repos', {
      name,
    }).catch((err) => {
      spinnerInstance.stop(`Create repository fail: ${err.message}`)
    })
    const htmlUrl = (res as OctokitResponse<any>).data.html_url

    spinnerInstance.stop(`Create repository successfully, url: ${htmlUrl}`)

    resolve(htmlUrl)
  })
}
