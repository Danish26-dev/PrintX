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

