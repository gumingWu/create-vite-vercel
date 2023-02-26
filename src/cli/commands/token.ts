import { group, text } from '@clack/prompts'
import type { PromptGroup } from '@clack/prompts'
import { saveGithubToken, saveVercelToken } from '../../utils'

interface ITokenCommand {
  github?: boolean
  vercel?: boolean
}

interface IProptGroupForToken {
  github?: string | symbol
  vercel?: string | symbol
}

export async function tokenCommand(options: ITokenCommand) {
  const groupOptions: PromptGroup<IProptGroupForToken> = {}

  options.github && (groupOptions.github = () => text({ message: 'Paste your github token' }))
  options.vercel && (groupOptions.vercel = () => text({ message: 'Paste your vercel token' }))

  const groupResult = await group(groupOptions)

  options.github && await saveGithubToken(groupResult.github as string)
  options.vercel && await saveVercelToken(groupResult.vercel as string)
}
