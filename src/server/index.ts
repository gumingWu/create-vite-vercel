import { Octokit } from '@octokit/core'
import { ofetch } from 'ofetch'
import { getGithubToken, getVercelToken } from '../utils'

export async function useOctokit() {
  const auth = await getGithubToken()
  const octokit = new Octokit({
    auth,
  })
  return octokit
}

export async function useOFetch() {
  const token = await getVercelToken()
  const tokenFetch = ofetch.create({
    baseURL: 'https://api.vercel.com',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return tokenFetch
}

export * from './git'
export * from './vercel'
