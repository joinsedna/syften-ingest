import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { SyftenItem } from '../src/types'
import { transformToDiscordEmbed } from '../src/transform'
import { sendToDiscord } from '../src/discord'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL
  if (!webhookUrl) {
    return res.status(500).json({ error: 'Discord webhook URL not configured' })
  }

  try {
    const items = req.body as SyftenItem[]
    
    if (!Array.isArray(items)) {
      return res.status(400).json({ error: 'Invalid payload format. Expected array of items.' })
    }

    if (items.length === 0) {
      return res.status(200).json({ message: 'No items to process' })
    }

    const embeds = items.slice(0, 10).map(transformToDiscordEmbed)
    
    await sendToDiscord(webhookUrl, { embeds })

    return res.status(200).json({ 
      message: 'Successfully forwarded to Discord',
      processed: embeds.length,
      total: items.length
    })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return res.status(500).json({ 
      error: 'Failed to process webhook',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}