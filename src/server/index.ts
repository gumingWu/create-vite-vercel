import { Octokit } from '@octokit/core'
import { getUserAuth } from '../utils/git'

export async function useOctokit() {
  const auth = await getUserAuth()
  const octokit = new Octokit({
    auth,
  })
  return octokit
}
