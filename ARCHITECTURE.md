# AMD Project Architecture

Complete three-tier architecture: React frontend, Express backend, and AI agent orchestration.

## 📋 System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React)                          │
│  - UI Components, File Upload, Document Preview            │
│  - Chat Interface, Real-time Interactions                  │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP
                       ↓
┌─────────────────────────────────────────────────────────────┐
│              Backend (Express + TypeScript)                  │
│  - REST APIs (/api/files, /api/printer)                    │
│  - File Upload & Management                                 │
│  - Printer Service Orchestration                           │
│  - HTTP Client for Strands Agent                           │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP
                       ↓
┌─────────────────────────────────────────────────────────────┐
│         Strands AI Agent (Express + TypeScript)             │
│  - AWS Bedrock LLM Integration (isolated)                  │
│  - Tool Orchestration & Execution                          │
│  - Document Analysis & Reasoning                           │
│  - Deterministic Tool Registry (no LLM)                    │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Folder Structure

```
AMD/
├── frontend/                    # React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   └── package.json
│
├── Backend/                     # Express API server
│   ├── src/
│   │   ├── app.ts              # Express app setup
│   │   ├── index.ts            # Server entry
│   │   ├── clients/
│   │   │   └── strandsAgentClient.ts  # HTTP client to agent
│   │   ├── routes/             # API endpoints
│   │   │   ├── fileRoutes.ts
│   │   │   ├── printerRoutes.ts
│   │   │   └── healthRoutes.ts
│   │   ├── middleware/
│   │   │   └── errorHandler.ts
│   │   └── types/
│   │       └── index.ts        # TypeScript interfaces
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
└── Strand_agents/               # AI Reasoning Engine
    ├── src/
    │   ├── app.ts              # Express app setup
    │   ├── index.ts            # Server entry
    │   ├── clients/
    │   │   └── bedrock.client.ts  # AWS Bedrock LLM (isolated)
    │   ├── services/
    │   │   └── orchestrator.ts  # Tool selection & execution
    │   ├── tools/
    │   │   └── toolRegistry.ts  # Deterministic tool definitions
    │   ├── routes/
    │   │   └── agentRoutes.ts  # Reasoning endpoints
    │   └── middleware/
    │       └── errorHandler.ts
    ├── package.json
    ├── tsconfig.json
    └── README.md
```

## 🔄 Communication Flow

### Document Analysis Flow

1. **Frontend** → User uploads document + query
2. **Frontend** → Backend: `POST /api/files/analyze { documentId, query, content }`
3. **Backend** → Strands Agent: `POST /api/reason { document, query }`
4. **Bedrock** (isolated in bedrock.client.ts) → LLM reasoning
5. **Orchestrator** → Selects & executes deterministic tools
6. **Strands Agent** → Returns tool results to Backend
7. **Backend** → Returns analysis to Frontend

### Printer Task Flow

1. **Frontend** → Backend: `POST /api/printer/task { action, documentId }`
2. **Backend** → Strands Agent: `POST /api/printer-task { ... }`
3. **Orchestrator** → Validates & formats for printer
4. **Strands Agent** → Returns task status
5. **Backend** → Returns response to Frontend

## 🏗️ Architecture Principles

### Backend Responsibilities
- **REST API**: Expose endpoints for frontend
- **File Management**: Handle uploads, storage
- **Service Coordination**: Communicate with Strands Agent
- **Error Handling**: Centralized middleware

### Strands Agent Responsibilities
- **Bedrock Integration**: Isolated in `bedrock.client.ts`
- **Tool Orchestration**: Select & execute tools based on reasoning
- **Task Processing**: Handle document analysis & printer tasks
- **Health Checks**: Provide status to backend

### Tool Design (Deterministic)
- **No LLM calls inside tools**
- **Pure functions**: Same input → Same output
- **Registered tools**: `toolRegistry` contains all available tools
- **Examples**:
  - `parse_document`: Tokenization, line counting
  - `extract_metadata`: Regex-based date/email extraction
  - `format_for_print`: Layout & spacing configuration
  - `validate_printer_task`: Parameter validation

### Bedrock Isolation
- All LLM invocations → `bedrock.client.ts`
- Clean, single-responsibility client
- Easy to swap LLM providers
- Centralized error handling

## 🚀 Getting Started

### Install Dependencies

```bash
# Backend
cd Backend
npm install

# Strands Agent
cd ../Strand_agents
npm install

# Frontend (already set up)
cd ../frontend
npm install
```

### Run Dev Servers

**Terminal 1 - Strands Agent** (runs on port 4000)
```bash
cd Strand_agents
npm run dev
```

**Terminal 2 - Backend** (runs on port 3001)
```bash
cd Backend
npm run dev
```

**Terminal 3 - Frontend** (runs on port 3000)
```bash
cd frontend
npm start
```

## 🔧 Configuration

### Backend `.env`
```
PORT=3001
STRANDS_AGENT_URL=http://localhost:4000
NODE_ENV=development
```

### Strands Agent `.env`
```
PORT=4000
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
BEDROCK_MODEL_ID=anthropic.claude-3-sonnet-20240229-v1:0
NODE_ENV=development
```

## 📦 API Endpoints

### Backend

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/health` | Health check |
| POST | `/api/files/upload` | Upload document |
| POST | `/api/files/analyze` | Analyze document with AI |
| GET | `/api/files/list` | List uploaded files |
| POST | `/api/printer/task` | Execute printer task |
| GET | `/api/printer/status` | Get printer status |

### Strands Agent

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/health` | Agent health |
| POST | `/api/reason` | Reason about document |
| POST | `/api/printer-task` | Process printer task |

## 🛠️ Build & Deploy

### Build for Production

```bash
# Backend
cd Backend
npm run build

# Strands Agent
cd Strand_agents
npm run build

# Frontend
cd frontend
npm run build
```

### Run Production

```bash
# Strands Agent (start first)
cd Strand_agents
npm start

# Backend (start second)
cd Backend
npm start

# Frontend (start third)
cd frontend
npm start
```

## 📝 Types & Interfaces

All TypeScript interfaces defined in:
- **Backend**: `src/types/index.ts`
- **Strands Agent**: Tool interfaces in `src/tools/toolRegistry.ts`

## 🧪 Testing

```bash
# Backend tests
cd Backend
npm test

# Agent tests
cd Strand_agents
npm test

# Frontend tests
cd frontend
npm test
```

## 🔐 Security Notes

- Bedrock API keys stored in `.env` (never committed)
- CORS configured for same-origin requests
- Error handlers strip sensitive info from responses
- Input validation on all public APIs

## 📚 Further Development

### Adding New Tools

1. Define tool in `Strand_agents/src/tools/toolRegistry.ts`
2. Implement `execute()` function (deterministic only)
3. Register in `toolRegistry`
4. Update orchestrator tool selection logic

### Adding New API Endpoints

1. Create route in Backend `src/routes/`
2. Call `strandsAgent` client if reasoning needed
3. Return response to frontend
4. Define TypeScript interfaces in `types/index.ts`

### Scaling Considerations

- **Database**: Integrate PostgreSQL for file/task persistence
- **Queue**: Add Bull/RabbitMQ for async task processing
- **Caching**: Redis for agent response caching
- **Monitoring**: Add logging (Winston, Bunyan)
- **Load Balancing**: Reverse proxy multiple service instances
