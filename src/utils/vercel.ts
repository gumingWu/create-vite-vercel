import simpleGit from 'simple-git'
import { note } from '@clack/prompts'
import { CVV_VERCEL_TOKEN_KEY } from './constant'

const git = simpleGit()

export function saveVercelToken(token: string) {
  return new Promise<void>(async (resolve) => {
    await git.addConfig(CVV_VERCEL_TOKEN_KEY, token, false, 'global')
    note(`save vercel token successfully: ${token}`)
    resolve()
  })
}

export function getVercelToken() {
  return new Promise(async (resolve, reject) => {
    const token = await git.getConfig(CVV_VERCEL_TOKEN_KEY, 'global')
    if (!token.value) {
      note('No vercel token, please run  "create-vite-vercel token" to save', 'warning')
      reject(new Error('no vercel token'))
    }

    resolve(token.value)
  })
}
