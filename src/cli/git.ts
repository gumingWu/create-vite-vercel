import { note } from '@clack/prompts'
import simpleGit from 'simple-git'
import { CVV_AUTH_TOKEN_KEY } from './constant'

const git = simpleGit()

export async function getUserAuth() {
  const authToken = await git.getConfig(CVV_AUTH_TOKEN_KEY, 'global')

  if (!authToken.value) {
    note('No github auth token, please run  "create-vite-vercel auth" to save', 'warning')
    return
  }

  note(authToken.value)
}

export async function saveUserAuth(authToken: string) {
  return new Promise<void>(async (resolve) => {
    await git.addConfig(CVV_AUTH_TOKEN_KEY, authToken, false, 'global')
    note(`save auth successfully: ${authToken}`)
    resolve()
  })
}
