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
  execSync('git init', {
    cwd: projectDir,
  })
  execSyncCwd('git init', projectDir)
  execSyncCwd('git add -A', projectDir)
  execSyncCwd('git commit -m "first commit"', projectDir)
  execSyncCwd('git branch -M main', projectDir)
  execSyncCwd(`git remote add origin ${url}`, projectDir)
  execSyncCwd('git push -u origin main', projectDir)

  spin.stop('Git push finish')
}

function execSyncCwd(command: string, projectDir: string) {
  return execSync(command, {
    cwd: projectDir,
  })
}
