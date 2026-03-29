## PrintX-Autonomous Printing with Privacy
--
##  Problem

In today’s digital-first world, users frequently need to print documents such as assignments, resumes, ID proofs, tickets, and forms. However, the current printing ecosystem is highly fragmented, manual, and inefficient, especially in local print shops.

Most existing solutions require:

Physical presence at the shop
Manual file transfer (USB, WhatsApp, Email)
Verbal communication of print settings
Human intervention for file formatting and validation

This results in delays, miscommunication, privacy risks, and poor user experience.
---

##  Solution
PrintX is an AI-orchestrated document processing and printing system that replaces manual print workflows with structured automation.
The system enables natural language document modification, controlled print execution, and automatic cleanup of temporary files. It is designed with strict separation between infrastructure and AI orchestration layers.

Overview
Traditional print shop workflows are manual and inefficient:
1.Documents are shared over messaging platforms
2.Files are downloaded and edited manually
3.Multiple copies are created repetitivel
4.Print settings are configured one by one
5.Sensitive documents remain stored without lifecycle control
# 🖨️ PrintX — Autonomous Document Execution with Privacy
PrintX transforms:

**Human Intent → AI Planning → Deterministic Execution → Physical Output**

---

##  Execution Flow

```
User Upload + Instruction
        ↓
Agent Reasoning (AWS Bedrock)
        ↓
Workflow Planning
        ↓
Deterministic Tool Execution
        ↓
Printer Execution
        ↓
Automatic Cleanup
```

---

##  Architecture Overview
<img width="1824" height="861" alt="printxlfow" src="https://github.com/user-attachments/assets/34299077-7b8e-4ca2-948e-5d4a90c95ee5" />

---

##  System Design

### 🔹 Frontend

* UI for users & shopkeepers
* Chat + workspace system
* File upload & preview

---

### 🔹 Backend

* REST APIs
* File handling
* Agent communication
* Validation & routing

---

### 🔹 Strands Agent

* LLM reasoning
* Workflow planning
* Tool orchestration

---

### 🔹 Tools Layer

* Deterministic execution
* No LLM calls
* Structured outputs

---

## Channel-Based Model

* Each shop = one agent
* Users join via link
* Fully autonomous execution

---

##  User Journeys

### Shopkeeper

* Create channel → Activate agent → Monitor

### User

* Join → Upload → Instruct → Receive output

### Agent

* Plan → Execute → Return result

---

## 📁 Complete Repository Structure

```
PrintX/
├── .github/
│   └── workflows/
│       └── ci.yml                # CI pipeline
│
├── Backend/                     # Infrastructure API
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── app.ts               # Express config
│       ├── index.ts             # Server entry
│       ├── clients/
│       │   └── strandsAgentClient.ts
│       ├── middleware/
│       │   └── errorHandler.ts
│       ├── routes/
│       │   ├── fileRoutes.ts
│       │   ├── printerRoutes.ts
│       │   └── healthRoutes.ts
│       └── types/
│           └── index.ts
│
├── Strand_agents/              # AI Orchestration Layer
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── app.ts
│       ├── index.ts
│       ├── clients/
│       │   └── bedrock.client.ts
│       ├── middleware/
│       │   └── errorHandler.ts
│       ├── routes/
│       │   └── agentRoutes.ts
│       ├── services/
│       │   └── orchestrator.ts
│       └── tools/
│           └── toolRegistry.ts
│
├── frontend/                   # React Application
│   ├── Dockerfile
│   ├── package.json
│   ├── tailwind.config.js
│   └── src/
│       ├── App.js
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── Workspace.jsx
│       │   └── ShopkeeperDashboard.jsx
│       ├── components/
│       │   ├── workspace/
│       │   └── ui/
│       ├── services/
│       │   ├── chatService.js
│       │   ├── fileService.js
│       │   └── shopService.js
│       └── styles/
│
├── ARCHITECTURE.md
├── QUICK_START.md
├── docker-compose.yml
└── package.json
```

---

##  Tech Stack

| Layer      | Technology                   |
| ---------- | ---------------------------- |
| Frontend   | React, Tailwind              |
| Backend    | Node.js, Express, TypeScript |
| Agent      | AWS Bedrock                  |
| Deployment | Docker                       |

---

##  Getting Started

```bash
cd Backend && npm install
cd ../Strand_agents && npm install
cd ../frontend && yarn install
```

---

### Run

```bash
npm run dev:agent
npm run dev:backend
yarn start:frontend
```

---

### Docker

```bash
docker-compose up --build
```

---

##  Privacy

* No persistent file storage
* Automatic cleanup
* Secure environment configs


##  Key Differentiator

> Autonomous execution engine (not just AI assistant)

---

##  Impact

* 80–90% time saved
* Fully automated workflows
* Privacy-first

---

## 📜 License

MIT License
