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
1.Upload
  ↓
2.LLM Interpretation(amazon bedrock claude)
  ↓
3.Deterministic Tool Execution(usind strands)
  ↓
4.Print-Ready Output
  ↓
5.Printer Relay
  ↓
6.Automatic Cleanup
The system is modular and designed for controlled extensibility.

Architecture
PrintX is divided into two independent services:
Frontend (UI Layer)
        ↓
Backend API (Infrastructure Layer)
        ↓
Strands Agent (AI Orchestration Layer)
        ↓
Deterministic Tools
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
├── Backend/            # Infrastructure API (Express + TS)
├── Strand_agents/      # AI Orchestration Service
├── frontend/           # React SPA
├── docker-compose.yml
├── ARCHITECTURE.md
├── QUICK_START.md
└── README.md
    
Layer	Key Technologies
| Layer           | Technologies                                  |
| --------------- | --------------------------------------------- |
| Frontend        | React, Tailwind CSS                           |
| Backend         | Node.js, Express, TypeScript, Multer          |
| AI Agent        | Node.js, Express, TypeScript, AWS Bedrock SDK |
| Orchestration   | Strands SDK                                   |
| Deployment      | Docker, Docker Compose                        |
| Version Control | Git                                           |

🔐 Privacy by Design

PrintX enforces lifecycle control:
-Temporary file storage only
-Automatic cleanup after execution
-No long-term retention of sensitive documents
-Centralized Bedrock access
-Environment-based secret configuration
-This ensures:
-Predictable execution
-Auditability

Design Principles:
-Strict separation of infrastructure and AI orchestration
-Deterministic tools (no hidden LLM calls)
-Centralized LLM client access
-Type-safe implementation (TypeScript across services)
-Loosely coupled HTTP communication
-Dockerized multi-service deployment

Reduced data exposure risk
✓ **Separation of concerns** – Each service has one responsibility
✓ **HTTP communication** – Loose coupling, easy to scale
✓ **Type safety** – Full TypeScript throughout
✓ **Deterministic tools** – No hidden LLM calls in tools
✓ **Bedrock isolation** – All LLM access via single client
✓ **Environment config** – No secrets in code
✓ **Error handling** – Centralized middleware & logging

⚙️ Getting Started
For setup and local development:
See → QUICK_START.md
For architecture and internal flow documentation:
See → ARCHITECTURE.md

📌 Key Differentiator
PrintX is not an AI print assistant:
-It is a structured AI-orchestrated execution system where:
-Infrastructure remains deterministic
-AI handles reasoning only
-Tools execute predictably
-Privacy is enforced by lifecycle control
