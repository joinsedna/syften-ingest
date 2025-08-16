# Syften Discord Webhook

Forward Syften webhook payloads to Discord channels via Vercel serverless functions.

## Prerequisites

- Bun runtime
- Vercel CLI
- Discord webhook URL

## Setup

### Environment Configuration

Create a `.env` file with your Discord webhook URL:

```
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
```

### Installation

```bash
bun install
```

### Local Development

```bash
bun run dev
```

Server runs on `http://localhost:3000`

## Deployment

Deploy to Vercel:

```bash
vercel
```

Set environment variable in Vercel dashboard:
- `DISCORD_WEBHOOK_URL` - Your Discord webhook endpoint

## API

### POST /api/webhook

Receives Syften webhook payloads and transforms them into Discord messages.

#### Request

Content-Type: `application/json`

Payload structure:
```typescript
interface SyftenItem {
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
```

Request body expects an array of `SyftenItem` objects.

#### Response

- `200 OK` - Messages forwarded successfully
- `400 Bad Request` - Invalid payload format
- `500 Internal Server Error` - Discord webhook failure

## Architecture

The service acts as a translation layer between Syften's webhook format and Discord's embed API. Each Syften item is converted to a Discord embed with relevant metadata preserved.

## License

MIT