import { Request, Response } from 'express'

import {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from 'discord-interactions'
import discordInteraction from '../../services/discord/bot'
import { sendTxtLoading } from '../../services/discord/bot/utils'
function getRawBody(req: Request): Promise<string> {
  return new Promise((resolve) => {
    const bodyChunks: Buffer[] = []
    req.on('end', () => {
      const rawBody = Buffer.concat(bodyChunks).toString('utf8')
      resolve(rawBody)
    })
    req.on('data', (chunk) => bodyChunks.push(chunk))
  })
}

const bot = async (req: Request, res: Response) => {
  if (req.method !== 'POST') return res.status(404).end()

  try {
    const rawBody = await getRawBody(req as any)
    // req.body
    console.error('req.body', JSON.stringify(req.body))
    console.error('rawBody', rawBody)
    const signature = String(req.headers['X-Signature-Ed25519']) || ''
    const timestamp = String(req.headers['X-Signature-Timestamp']) || ''
    const isValidRequest = await verifyKey(
      JSON.stringify(req.body),
      signature,
      timestamp,
      String(process.env.CLIENT_PUBLIC_KEY)
    )
    if (!isValidRequest) {
      return res.status(401).end('Bad request signature')
    }
    if (
      req.body &&
      req.body.type === InteractionType.APPLICATION_COMMAND &&
      req.body.data
    ) {
      await sendTxtLoading(res)
      await discordInteraction(req.body)
      return
    }
    return res.send({
      type: InteractionResponseType.PONG,
    })
  } catch (error) {
    console.error(error.message)
    return res.status(500).end('Error bot', error.message)
  }
}
export const config = { api: { bodyParser: false } }
export default bot
