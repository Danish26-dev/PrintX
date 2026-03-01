import {
  BedrockRuntimeClient,
  InvokeModelCommand,
  InvokeModelCommandInput,
} from '@aws-sdk/client-bedrock-runtime';
import dotenv from 'dotenv';

dotenv.config();

class BedrockClient {
  private client: BedrockRuntimeClient;
  private modelId: string;

  constructor() {
    this.client = new BedrockRuntimeClient({
      region: process.env.AWS_REGION || 'us-east-1',
    });
    this.modelId = process.env.BEDROCK_MODEL_ID || 'anthropic.claude-3-sonnet-20240229-v1:0';
  }

  async invokeModel(prompt: string, systemPrompt?: string): Promise<string> {
    try {
      const messages = systemPrompt
        ? [
            { role: 'user' as const, content: systemPrompt },
            { role: 'assistant' as const, content: 'Understood.' },
            { role: 'user' as const, content: prompt },
          ]
        : [{ role: 'user' as const, content: prompt }];

      const params = {
        modelId: this.modelId,
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify({
          anthropic_version: 'bedrock-2023-06-01',
          max_tokens: 1024,
          system: systemPrompt || 'You are a helpful AI assistant.',
          messages,
        }),
      };

      const command = new InvokeModelCommand(params as InvokeModelCommandInput);
      const response = await this.client.send(command);

      const responseBody = JSON.parse(new TextDecoder().decode(response.body));
      return responseBody.content[0]?.text || 'No response';
    } catch (error) {
      console.error('Bedrock invocation error:', error);
      throw error;
    }
  }

  async analyzeDocument(content: string, query: string): Promise<string> {
    const systemPrompt = 'You are an expert document analyzer. Analyze the provided document and answer questions about it accurately.';
    const prompt = `
Document:
${content}

Query:
${query}

Please analyze the document and provide a detailed response to the query.
    `;

    return this.invokeModel(prompt, systemPrompt);
  }
}

export const bedrockClient = new BedrockClient();
