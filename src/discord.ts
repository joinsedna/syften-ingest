import type { DiscordWebhookPayload } from './types'

export async function sendToDiscord(webhookUrl: string, payload: DiscordWebhookPayload): Promise<void> {
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`Discord API returned ${response.status}: ${await response.text()}`)
  }
}