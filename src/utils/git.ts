import { resolve } from 'node:path'
import { execSync } from 'node:child_process'
import { note, spinner } from '@clack/prompts'
import simpleGit from 'simple-git'
import { CVV_AUTH_TOKEN_KEY } from './constant'

const git = simpleGit()
const spin = spinner()

export async function getUserAuth() {
  const authToken = await git.getConfig(CVV_AUTH_TOKEN_KEY, 'global')

  if (!authToken.value) {
    note('No github auth token, please run  "create-vite-vercel auth" to save', 'warning')
    return
  }

  return authToken.value
}

export async function saveUserAuth(authToken: string) {
  return new Promise<void>(async (resolve) => {
    await git.addConfig(CVV_AUTH_TOKEN_KEY, authToken, false, 'global')
    note(`save auth successfully: ${authToken}`)
    resolve()
  })
}

export async function pushProject(projectDirName: string, url: string) {
  const currentDir = process.cwd()
  const projectDir = resolve(currentDir, projectDirName)

  spin.start('Git push start')

  await git.cwd({
    path: projectDir,
    root: true,
  })
    .init()
    .add('./*')
    .commit('first commit')
    .branch(['main'])
    .addRemote('origin', url)
    .push(['-u', 'origin', 'main'])
    .catch((err) => {
      note(`Git push fail: ${err.message}`)
    })

  spin.stop('Git push finish')
}
