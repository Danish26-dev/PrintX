# AMD Full Stack - Quick Start Guide

## 📦 One-Command Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Docker (optional, for containerized deployment)

### Option 1: Local Development

**Step 1: Install dependencies for all services**

```bash
# Backend
cd Backend
npm install
cd ..

# Strands Agent
cd Strand_agents
npm install
cd ..

# Frontend (already installed)
cd frontend
npm install
cd ..
```

**Step 2: Configure environment variables**

```bash
# Backend
cd Backend
cp .env.example .env

# Strands Agent
cd ../Strand_agents
cp .env.example .env
# ⚠️ Add AWS credentials to .env for Bedrock
cd ..
```

**Step 3: Start all services in separate terminals**

**Terminal 1 - Strands Agent:**
```bash
cd Strand_agents
npm run dev
# Runs on http://localhost:4000
```

**Terminal 2 - Backend:**
```bash
cd Backend
npm run dev
# Runs on http://localhost:3001
```

**Terminal 3 - Frontend:**
```bash
cd frontend
npm start
# Runs on http://localhost:3000
```

### Option 2: Docker Deployment

**Build and run all services:**

```bash
# Set AWS credentials
export AWS_ACCESS_KEY_ID=your-key
export AWS_SECRET_ACCESS_KEY=your-secret

# Build and start (from root AMD folder)
docker-compose up --build
```

Services will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Strands Agent: http://localhost:4000

## 🔍 API Testing

### Health Checks

```bash
# Backend health
curl http://localhost:3001/api/health

# Strands Agent health
curl http://localhost:4000/api/health
```

### Test Document Analysis

```bash
curl -X POST http://localhost:3001/api/files/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "documentId": "doc-1",
    "query": "What is the main topic?",
    "content": "The quick brown fox jumps over the lazy dog."
  }'
```

### Test Printer Task

```bash
curl -X POST http://localhost:3001/api/printer/task \
  -H "Content-Type: application/json" \
  -d '{
    "action": "print",
    "documentId": "doc-1",
    "parameters": { "copies": 1 }
  }'
```

## 📁 Project Structure

```
AMD/
├── frontend/              # React UI
├── Backend/               # Express API + File management
├── Strand_agents/         # AI Reasoning + Bedrock
├── ARCHITECTURE.md        # Full system design
├── docker-compose.yml     # Docker multi-container setup
└── README.md             # This file
```

## 🧪 Development Workflow

1. **Start all services** (see Step 3 above)
2. **Make code changes** in any service
3. **Save files** → Services auto-reload (with ts-node)
4. **Test via frontend** or API calls
5. **Check logs** in each terminal

## 🛠️ Useful Commands

### Build Production
```bash
# Backend
cd Backend && npm run build

# Strands Agent
cd Strand_agents && npm run build

# Frontend
cd frontend && npm run build
```

### Run Production
```bash
# Strands Agent (start first)
cd Strand_agents && npm start

# Backend (start second)
cd Backend && npm start

# Frontend (start third)
cd frontend && npm start
```

### Stop Services
- Press `Ctrl+C` in each terminal

### Clean Up
```bash
# Remove node_modules and build artifacts
cd Backend && rm -rf node_modules dist
cd ../Strand_agents && rm -rf node_modules dist
cd ../frontend && rm -rf node_modules build
```

## 🔐 Environment Variables

### Backend (.env)
```
PORT=3001
STRANDS_AGENT_URL=http://localhost:4000
NODE_ENV=development
```

### Strands Agent (.env)
```
PORT=4000
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
BEDROCK_MODEL_ID=anthropic.claude-3-sonnet-20240229-v1:0
NODE_ENV=development
```

## 🚀 Architecture Overview

```
Frontend (React)
    ↓ HTTP
Backend (Express)
    ↓ HTTP
Strands Agent (Express + Bedrock)
    ↓ AWS API
Bedrock LLM
```

**Flow:**
1. Frontend sends request to Backend
2. Backend communicates with Strands Agent
3. Strands Agent uses AWS Bedrock for AI reasoning
4. Deterministic tools execute (no LLM)
5. Results flow back to Frontend

## 📝 Key Features

✅ **TypeScript**: Full type safety across all services
✅ **Clean Architecture**: Separated concerns, easy testing
✅ **Scalable**: HTTP communication allows independent scaling
✅ **Bedrock Isolation**: All LLM calls in one place
✅ **Deterministic Tools**: Reliable, predictable execution
✅ **Docker Ready**: Easy containerized deployment

## 💡 Tips

- Check [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed system design
- Each service has its own README with specific instructions
- Add logging middleware for production monitoring
- Use environment variables for configuration
- Test APIs before connecting frontend

## ❓ Troubleshooting

**Strands Agent fails to start:**
- Ensure AWS credentials in `.env`
- Check AWS_REGION is valid
- Verify Bedrock API access in your AWS account

**Backend can't reach Strands Agent:**
- Confirm Strands Agent is running on port 4000
- Check STRANDS_AGENT_URL in Backend .env
- Verify no firewall blocking localhost:4000

**Frontend can't reach Backend:**
- Confirm Backend is running on port 3001
- Update API URL if needed
- Check CORS settings in Backend

**Port conflicts:**
- Change PORT in .env files
- Update service URLs accordingly
- Restart affected services

## 📚 Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Full system design
- [Backend/README.md](./Backend/README.md) - Backend specifics
- [Strand_agents/README.md](./Strand_agents/README.md) - Agent specifics
- [frontend/README.md](./frontend/README.md) - Frontend specifics

---

**Ready to go!** Start with Option 1 for local development. Questions? Check the ARCHITECTURE.md file for detailed design patterns and data flows.
