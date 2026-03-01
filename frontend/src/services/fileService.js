// Mock file service - Backend will replace with real file upload/processing

export const uploadFile = async (file) => {
  // Simulate upload delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Create a preview URL for the file
  const previewUrl = URL.createObjectURL(file);
  
  return {
    id: Date.now(),
    name: file.name,
    size: file.size,
    type: file.type,
    previewUrl,
    uploadedAt: new Date().toISOString(),
    status: 'uploaded'
  };
};

export const processDocument = async (fileId) => {
  // Simulate AI processing
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    fileId,
    status: 'processed',
    edits: ['Margins adjusted', 'Format optimized', 'Quality enhanced'],
    processedAt: new Date().toISOString()
  };
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};
