import simpleGit from 'simple-git'
import { note } from '@clack/prompts'
import { CVV_VERCEL_TOKEN_KEY } from './constant'

const git = simpleGit()

export function saveVercelToken(token: string) {
  return new Promise<void>(async (resolve) => {
    await git.addConfig(CVV_VERCEL_TOKEN_KEY, token, false, 'global')
    note(`save vercel successfully: ${token}`)
    resolve()
  })
}
