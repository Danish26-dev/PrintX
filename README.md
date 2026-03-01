# AMD – Full Stack Application

Complete enterprise-grade full stack with:
- **Frontend**: React SPA with document management
- **Backend**: Express REST API with file uploads & orchestration
- **Strands Agent**: AI reasoning engine with AWS Bedrock + deterministic tools

## 🚀 Quick Start

```bash
# Install all dependencies
cd Backend && npm install && cd ..
cd Strand_agents && npm install && cd ..
cd frontend && npm install && cd ..

# Configure environments
cd Backend && cp .env.example .env && cd ..
cd Strand_agents && cp .env.example .env && cd ..
# ⚠️ Add AWS credentials to Strand_agents/.env

# Terminal 1 - Start Agent
cd Strand_agents && npm run dev

# Terminal 2 - Start Backend
cd Backend && npm run dev

# Terminal 3 - Start Frontend
cd frontend && npm start
```

Open http://localhost:3000 in your browser.

## 📚 Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** – Complete system design & data flows
- **[QUICK_START.md](./QUICK_START.md)** – Detailed setup & development guide
- **[Backend/README.md](./Backend/README.md)** – API documentation
- **[Strand_agents/README.md](./Strand_agents/README.md)** – Agent specifications

## 🏗️ Architecture

```
React Frontend → Express Backend → Strands Agent → AWS Bedrock
```

- **Backend** coordinates requests, communicates with agent via HTTP
- **Strands Agent** handles AI reasoning (Bedrock isolated) + deterministic tools
- **All tools** are pure functions with no LLM dependencies
- **Bedrock calls** isolated in single `bedrock.client.ts` file

## 📦 Local Development

```bash
npm run dev:agent      # Terminal 1
npm run dev:backend    # Terminal 2  
npm run dev:frontend   # Terminal 3
```

## 🐳 Docker Deployment

```bash
docker-compose up --build
```

All services start automatically on:
- Frontend: 3000
- Backend: 3001
- Agent: 4000

## 🔧 Key Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/files/upload` | POST | Upload document |
| `/api/files/analyze` | POST | AI analysis via agent |
| `/api/printer/task` | POST | Printer orchestration |
| `/api/health` | GET | Health check |

## 🛠️ Development Tips

1. **Auto-reload**: ts-node watches file changes
2. **Type safety**: Full TypeScript across all services
3. **Log everything**: Check terminal output for debug info
4. **Test APIs**: Use curl or Postman before frontend integration
5. **Scale independently**: Each service runs on separate port

## 📋 Tech Stack

- **Frontend**: React, Tailwind CSS, custom UI components
- **Backend**: Express, TypeScript, Axios for HTTP
- **Agent**: Express, TypeScript, AWS Bedrock SDK
- **Tools**: Deterministic (no LLM), registry-based
- **Deployment**: Docker, Docker Compose

## ✅ Architecture Principles

✓ **Separation of concerns** – Each service has one responsibility
✓ **HTTP communication** – Loose coupling, easy to scale
✓ **Type safety** – Full TypeScript throughout
✓ **Deterministic tools** – No hidden LLM calls in tools
✓ **Bedrock isolation** – All LLM access via single client
✓ **Environment config** – No secrets in code
✓ **Error handling** – Centralized middleware & logging

---

**See [QUICK_START.md](./QUICK_START.md) for step-by-step instructions**
"# PrintX" 
"# PrintX" 
"# PrintX" 
