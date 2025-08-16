export interface SyftenItem {
  backend: string
  backend_sub: string
  type: string
  icon_url: string
  timestamp: string
  item_url: string
  author: string
  parent_author: string
  text: string
  title: string
  title_type: number
  lang: string
  filter: string
}

export interface DiscordEmbed {
  title?: string
  description?: string
  url?: string
  timestamp?: string
  color?: number
  footer?: {
    text: string
    icon_url?: string
  }
  author?: {
    name: string
    url?: string
    icon_url?: string
  }
  fields?: Array<{
    name: string
    value: string
    inline?: boolean
  }>
}

export interface DiscordWebhookPayload {
  embeds: DiscordEmbed[]
}