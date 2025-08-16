import type { SyftenItem, DiscordEmbed } from './types'

export function transformToDiscordEmbed(item: SyftenItem): DiscordEmbed {
  const embed: DiscordEmbed = {
    title: item.title || 'New Syften Alert',
    description: item.text,
    url: item.item_url,
    timestamp: item.timestamp,
    color: 0x5865F2,
    author: item.author ? {
      name: item.author,
      icon_url: item.icon_url
    } : undefined,
    footer: {
      text: `${item.backend}${item.backend_sub ? ` / ${item.backend_sub}` : ''}`
    },
    fields: []
  }

  if (item.filter) {
    embed.fields?.push({
      name: 'Filter',
      value: item.filter,
      inline: true
    })
  }

  if (item.lang) {
    embed.fields?.push({
      name: 'Language',
      value: item.lang,
      inline: true
    })
  }

  if (item.parent_author) {
    embed.fields?.push({
      name: 'In reply to',
      value: item.parent_author,
      inline: true
    })
  }

  if (embed.fields?.length === 0) {
    delete embed.fields
  }

  return embed
}