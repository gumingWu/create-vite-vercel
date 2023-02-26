import { resolve } from 'node:path'
import { note, spinner } from '@clack/prompts'
import simpleGit from 'simple-git'
import { CVV_GITHUB_TOKEN_KEY } from './constant'

const git = simpleGit()
const spin = spinner()

export async function getGithubToken() {
  return new Promise(async (resolve, reject) => {
    const token = await git.getConfig(CVV_GITHUB_TOKEN_KEY, 'global')
    if (!token.value) {
      note('No github token, please run  "create-vite-vercel token" to save', 'warning')
      reject(new Error('no github token'))
    }

    resolve(token.value)
  })
}

export async function saveGithubToken(authToken: string) {
  return new Promise<void>(async (resolve) => {
    await git.addConfig(CVV_GITHUB_TOKEN_KEY, authToken, false, 'global')
    note(`save github token successfully: ${authToken}`)
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
