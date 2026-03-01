PrintX-Autonomous Printing with Privacy

PrintX is an AI-orchestrated document processing and printing system that replaces manual print workflows with structured automation.
The system enables natural language document modification, controlled print execution, and automatic cleanup of temporary files. It is designed with strict separation between infrastructure and AI orchestration layers.

Overview
Traditional print shop workflows are manual and inefficient:
1.Documents are shared over messaging platforms
2.Files are downloaded and edited manually
3.Multiple copies are created repetitivel
4.Print settings are configured one by one
5.Sensitive documents remain stored without lifecycle control

PrintX restructures this workflow into a deterministic execution pipeline:
1. Upload document
2. Interpret instruction using LLM
3. Execute structured editing tools
4. Generate print-ready output
5. Send to printer
6. Remove temporary files
The system is modular and designed for controlled extensibility.

Architecture
PrintX is divided into two independent services:
->Frontend
↓
Backend API (Infrastructure Layer)
↓
Strands Agent Service (AI Orchestration Layer)
↓
Tool Execution
↓
Printer Relay

->Backend (/backend)

Handles infrastructure responsibilities only:
1.REST APIs
2.File uploads
3.Temporary storage
4.Printer integration
5.Communication with agent service
The backend does not perform AI reasoning.

->Strands Agent (/strands-agent)
Handles AI orchestration:

1.AWS Bedrock integration
2.Strands SDK configuration
3.Tool selection and execution
4.Structured response generation
The agent layer is isolated to prevent business logic leakage into infrastructure code.

Tools Layer:
Tools are deterministic and do not invoke the LLM directly.

Examples:

1.editDocx.tool.ts
2.editPdf.tool.ts
3.convertPdf.tool.ts
4.print.tool.ts

Each tool:
-Accepts structured input
-Executes transformation logic
-Returns structured output

FILE STRUCTURE:


PrintX/
├── ARCHITECTURE.md            # design and flow documentation
├── QUICK_START.md             # setup & run instructions
├── README.md                  # project overview & commands
├── docker-compose.yml         # multi‑container orchestration
├── package.json               # root scripts (dev & docker helpers)
├── .gitignore                 # global ignores
│
├── Backend/                   # Express REST API
│   ├── package.json           # deps: express, axios, multer, cors, dotenv
│   ├── tsconfig.json
│   ├── Dockerfile
│   ├── .env.example
│   ├── src/
│   │   ├── app.ts             # Express app config
│   │   ├── index.ts           # server entrypoint
│   │   ├── clients/           # HTTP client to Strands agent
│   │   ├── routes/            # fileRoutes, printerRoutes, healthRoutes
│   │   ├── middleware/        # errorHandler
│   │   └── types/             # shared TypeScript interfaces
│
├── Strand_agents/             # AI reasoning & tool orchestration
│   ├── package.json           # deps: express, @aws-sdk/client-bedrock-runtime, dotenv, cors
│   ├── tsconfig.json
│   ├── Dockerfile
│   ├── .env.example
│   ├── src/
│   │   ├── app.ts             # Express app config
│   │   ├── index.ts           # server entrypoint
│   │   ├── clients/           # bedrock.client.ts (LLM calls)
│   │   ├── services/          # orchestrator logic
│   │   ├── tools/             # deterministic tool registry
│   │   ├── routes/            # agentRoutes (reason, printer-task, health)
│   │   └── middleware/        # errorHandler
│
└── frontend/                  # React single‑page application
    ├── package.json           # deps: react, tailwind, etc.
    ├── jsconfig.json
    ├── tailwind.config.js
    ├── Dockerfile
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/        # UI building blocks
    │   ├── pages/             # Home, Workspace, Shopkeeper views
    │   ├── services/          # chatService, fileService, shopService
    │   ├── hooks/             # use-toast.js
    │   ├── styles/            # CSS files
    │   └── lib/               # utils.js


    
Layer	Key Technologies
-Frontend	React, Tailwind CSS, Craco, JavaScript/JSX
-Backend	Node.js, Express, TypeScript, Axios, Multer
-AI Agent	Node.js, Express, TypeScript, AWS Bedrock SDK
-Common utilities	dotenv, cors, ts-node (dev), Jest (placeholder)
-Build/Deploy	TypeScript compiler, Docker & Docker Compose
-Version control	Git (pushed to GitHub repo)

✓ **Separation of concerns** – Each service has one responsibility
✓ **HTTP communication** – Loose coupling, easy to scale
✓ **Type safety** – Full TypeScript throughout
✓ **Deterministic tools** – No hidden LLM calls in tools
✓ **Bedrock isolation** – All LLM access via single client
✓ **Environment config** – No secrets in code
✓ **Error handling** – Centralized middleware & logging

**See [QUICK_START.md](./QUICK_START.md) for step-by-step 
    
