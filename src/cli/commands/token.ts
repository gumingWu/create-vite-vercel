import { note, text } from '@clack/prompts'
import { saveUserAuth } from '../../utils'

export async function tokenCommand() {
  note('im auth')
  const auth = await text({
    message: 'Paste your github auth token',
  })
  await saveUserAuth(auth as string)
}
