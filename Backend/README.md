# AMD Backend

REST API server handling:
- File uploads and document management
- Printer service orchestration
- Communication with Strands Agent for AI reasoning

## Architecture

- **Controllers**: Request handling & validation
- **Services**: Business logic & external integrations  
- **Repositories**: Data access layer
- **Utilities**: Helpers & common functions
- **Config**: Environment & settings

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Server runs on `http://localhost:3001`

## Build

```bash
npm run build
```

## Environment Variables

Copy `.env.example` to `.env` and configure:
- `PORT`: Server port
- `STRANDS_AGENT_URL`: AI agent service URL
