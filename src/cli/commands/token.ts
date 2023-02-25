import { group, text } from '@clack/prompts'
import { saveGithubToken, saveVercelToken } from '../../utils'

export async function tokenCommand() {
  const groupText = await group({
    github: () => text({ message: 'Paste your github token' }),
    vercel: () => text({ message: 'Paste your vercel token' }),
  })
  await saveGithubToken(groupText.github)
  await saveVercelToken(groupText.vercel)
}
