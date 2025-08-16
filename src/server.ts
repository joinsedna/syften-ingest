import type { SyftenItem } from './types'
import { transformToDiscordEmbed } from './transform'
import { sendToDiscord } from './discord'

const PORT = process.env.PORT || 3000

const server = Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url)
    
    if (url.pathname !== '/api/webhook') {
      return new Response('Not Found', { status: 404 })
    }

    if (req.method !== 'POST') {
      return Response.json({ error: 'Method not allowed' }, { status: 405 })
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL
    if (!webhookUrl) {
      return Response.json({ error: 'Discord webhook URL not configured' }, { status: 500 })
    }

    try {
      const items = await req.json() as SyftenItem[]
      
      if (!Array.isArray(items)) {
        return Response.json({ error: 'Invalid payload format. Expected array of items.' }, { status: 400 })
      }

      if (items.length === 0) {
        return Response.json({ message: 'No items to process' }, { status: 200 })
      }

      const embeds = items.slice(0, 10).map(transformToDiscordEmbed)
      
      await sendToDiscord(webhookUrl, { embeds })

      return Response.json({ 
        message: 'Successfully forwarded to Discord',
        processed: embeds.length,
        total: items.length
      }, { status: 200 })
    } catch (error) {
      console.error('Webhook processing error:', error)
      return Response.json({ 
        error: 'Failed to process webhook',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 })
    }
  },
})

console.log(`Server running at http://localhost:${server.port}`)
console.log(`POST http://localhost:${server.port}/api/webhook`)