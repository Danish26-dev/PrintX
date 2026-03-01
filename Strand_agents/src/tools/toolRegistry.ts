/**
 * Tool definitions - deterministic, non-LLM operations
 * Tools are called by the orchestrator based on the task
 */

export interface Tool {
  name: string;
  description: string;
  execute: (input: any) => Promise<any>;
}

/**
 * Parse document tool - deterministic text parsing
 */
export const parseDocumentTool: Tool = {
  name: 'parse_document',
  description: 'Parses and extracts structured data from document content',
  execute: async (input: { content: string; format: string }) => {
    try {
      // Deterministic parsing logic - no LLM
      const lines = input.content.split('\n');
      const parsed = {
        rawContent: input.content,
        lineCount: lines.length,
        wordCount: input.content.split(/\s+/).length,
        format: input.format,
        extractedAt: new Date(),
      };
      return parsed;
    } catch (error) {
      throw new Error(`Document parsing failed: ${error}`);
    }
  },
};

/**
 * Extract metadata tool - deterministic metadata extraction
 */
export const extractMetadataTool: Tool = {
  name: 'extract_metadata',
  description: 'Extracts metadata from document (dates, keywords, structure)',
  execute: async (input: { content: string }) => {
    try {
      // Deterministic metadata extraction - no LLM
      const datePattern = /\d{1,2}\/\d{1,2}\/\d{4}/g;
      const dates = input.content.match(datePattern) || [];

      const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
      const emails = input.content.match(emailPattern) || [];

      return {
        detectedDates: dates,
        detectedEmails: emails,
        contentLength: input.content.length,
        language: 'en', // Could implement language detection
      };
    } catch (error) {
      throw new Error(`Metadata extraction failed: ${error}`);
    }
  },
};

/**
 * Format for print tool - deterministic formatting
 */
export const formatForPrintTool: Tool = {
  name: 'format_for_print',
  description: 'Formats document content for printing with proper layout',
  execute: async (input: { content: string; pageSize: string; margins: any }) => {
    try {
      // Deterministic formatting - no LLM
      const formatted = {
        content: input.content,
        pageSize: input.pageSize || 'A4',
        margins: input.margins || { top: 20, bottom: 20, left: 15, right: 15 },
        lineSpacing: 1.5,
        formattedAt: new Date(),
      };
      return formatted;
    } catch (error) {
      throw new Error(`Print formatting failed: ${error}`);
    }
  },
};

/**
 * Validate printer task tool - deterministic validation
 */
export const validatePrinterTaskTool: Tool = {
  name: 'validate_printer_task',
  description: 'Validates printer task parameters before execution',
  execute: async (input: { taskId: string; action: string; parameters: any }) => {
    try {
      // Deterministic validation - no LLM
      const validActions = ['print', 'preview', 'save', 'email'];
      const isValid = validActions.includes(input.action);

      return {
        taskId: input.taskId,
        isValid,
        action: input.action,
        validationMessage: isValid ? 'Task valid' : `Invalid action: ${input.action}`,
      };
    } catch (error) {
      throw new Error(`Task validation failed: ${error}`);
    }
  },
};

// Tool registry
export const toolRegistry: Record<string, Tool> = {
  parse_document: parseDocumentTool,
  extract_metadata: extractMetadataTool,
  format_for_print: formatForPrintTool,
  validate_printer_task: validatePrinterTaskTool,
};

export const getAvailableTools = (): Array<{ name: string; description: string }> => {
  return Object.values(toolRegistry).map((tool) => ({
    name: tool.name,
    description: tool.description,
  }));
};
