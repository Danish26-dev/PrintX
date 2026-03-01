import { bedrockClient } from '../clients/bedrock.client';
import { toolRegistry, getAvailableTools } from '../tools/toolRegistry';

interface AgentTask {
  type: 'document_analysis' | 'printer_task';
  content?: string;
  query?: string;
  parameters?: any;
}

interface AgentResponse {
  result: any;
  reasoning: string;
  toolsUsed: string[];
}

/**
 * Orchestrates task execution:
 * 1. Use Bedrock LLM to reason about what tools to use
 * 2. Execute selected deterministic tools
 * 3. Return results to backend
 */
export class Orchestrator {
  async processTask(task: AgentTask): Promise<AgentResponse> {
    const toolsInfo = getAvailableTools();

    // Step 1: Reason with Bedrock LLM (isolated Bedrock call)
    let reasoning = '';
    let toolsToExecute: string[] = [];

    if (task.type === 'document_analysis' && task.content && task.query) {
      // Use Bedrock to reason about document and determine tools
      reasoning = await bedrockClient.analyzeDocument(task.content, task.query);

      // Parse LLM response to determine which tools to use
      // (This is where AI reasoning informs tool selection)
      toolsToExecute = this.selectTools(task.type, task.query);
    } else if (task.type === 'printer_task') {
      // Select printer-related tools
      toolsToExecute = ['validate_printer_task'];
    }

    // Step 2: Execute deterministic tools (NO LLM calls here)
    const toolResults: Record<string, any> = {};
    for (const toolName of toolsToExecute) {
      const tool = toolRegistry[toolName];
      if (tool) {
        try {
          toolResults[toolName] = await tool.execute(task.parameters || {});
        } catch (error: any) {
          toolResults[toolName] = { error: error.message };
        }
      }
    }

    return {
      result: toolResults,
      reasoning,
      toolsUsed: toolsToExecute,
    };
  }

  private selectTools(taskType: string, query?: string): string[] {
    if (taskType === 'document_analysis') {
      return ['parse_document', 'extract_metadata'];
    } else if (taskType === 'printer_task') {
      return ['validate_printer_task', 'format_for_print'];
    }
    return [];
  }
}

export const orchestrator = new Orchestrator();
