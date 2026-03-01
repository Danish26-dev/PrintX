export interface FileMetadata {
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
}

export interface DocumentAnalysisRequest {
  documentId: string;
  query: string;
}

export interface DocumentAnalysisResponse {
  result: any;
  reasoning: string;
}

export interface PrinterTask {
  taskId: string;
  action: string;
  documentId?: string;
  parameters?: Record<string, any>;
}

export interface PrinterTaskResponse {
  taskId: string;
  status: 'success' | 'pending' | 'failed';
  message: string;
}
