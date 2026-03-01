# Strands AI Agent

AI reasoning engine with tool orchestration:
- AWS Bedrock LLM integration
- Deterministic tool execution
- Document analysis & reasoning
- Printer task orchestration

## Architecture

- **bedrock.client.ts**: Isolated Bedrock API calls
- **tools/**: Deterministic tool implementations (no LLM calls)
- **orchestrator.ts**: Tool selection & execution flow
- **services/**: Business logic
- **controllers/**: Request handling

## Setup

```bash
npm install
```

## Environment Variables

Copy `.env.example` to `.env`:
- AWS credentials for Bedrock access
- Model ID selection
- Server port

## Development

```bash
npm run dev
```

Agent runs on `http://localhost:4000`

## Architecture Principles

- **Bedrock isolation**: All LLM calls via bedrock.client.ts
- **Deterministic tools**: Tools never call LLM directly
- **HTTP communication**: Backend sends requests, agent responds
- **No Express routing in tools**: Controllers handle routing only
