import axios, { AxiosInstance } from 'axios';

class StrandsAgentClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async reasonAboutDocument(documentContent: string, query: string): Promise<any> {
    try {
      const response = await this.client.post('/api/reason', {
        document: documentContent,
        query,
      });
      return response.data;
    } catch (error) {
      console.error('Strands Agent error:', error);
      throw error;
    }
  }

  async executePrinterTask(task: any): Promise<any> {
    try {
      const response = await this.client.post('/api/printer-task', task);
      return response.data;
    } catch (error) {
      console.error('Strands Agent printer task error:', error);
      throw error;
    }
  }

  async health(): Promise<boolean> {
    try {
      const response = await this.client.get('/api/health');
      return response.status === 200;
    } catch {
      return false;
    }
  }
}

const strandsAgentUrl = process.env.STRANDS_AGENT_URL || 'http://localhost:4000';
export const strandsAgent = new StrandsAgentClient(strandsAgentUrl);
