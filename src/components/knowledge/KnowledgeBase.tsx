import React, { useState } from 'react';
import { Upload, X, FileText, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import KnowledgeProcessing from './KnowledgeProcessing';
import { Typography, Button, IconButton, Alert, Box } from '@mui/material';

const KnowledgeBase: React.FC = () => {
  const { t } = useTranslation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(prevFiles => [...prevFiles, ...droppedFiles]);
    handleUpload(droppedFiles);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
      handleUpload(selectedFiles);
    }
  };

  const handleUpload = (filesToUpload: File[]) => {
    setIsProcessing(true);
    // Simulating file processing
    setTimeout(() => {
      handleProcessingComplete();
    }, 2000);
  };

  const handleProcessingComplete = () => {
    setIsProcessing(false);
    // Add processed files to knowledge base
  };

  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        {t('knowledgeBase.title')}
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body1">
          {t('knowledgeBase.uploadInstructions')}
        </Typography>
      </Box>

      <Box
        sx={{
          border: '2px dashed',
          borderColor: 'divider',
          borderRadius: 2,
          p: 3,
          textAlign: 'center',
          mb: 3
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Typography variant="h6" gutterBottom>
          {t('assistant.dragAndDrop')}
        </Typography>
        <Button
          variant="contained"
          component="label"
          startIcon={<Upload />}
        >
          {t('common.selectFiles')}
          <input
            type="file"
            hidden
            multiple
            onChange={handleFileSelect}
          />
        </Button>
      </Box>

      {files.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {t('common.selectedFiles')}
          </Typography>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <Typography>{file.name}</Typography>
                </div>
                <IconButton
                  onClick={() => removeFile(index)}
                  size="small"
                  className="text-gray-500 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </IconButton>
              </div>
            ))}
          </div>
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              onClick={handleUpload}
              startIcon={<FileText />}
            >
              {t('common.process')}
            </Button>
            <Button
              variant="outlined"
              onClick={() => setFiles([])}
              startIcon={<X />}
            >
              {t('common.clear')}
            </Button>
          </Box>
        </Box>
      )}

      {isProcessing && <KnowledgeProcessing />}

      {!isProcessing && files.length > 0 && (
        <Alert
          severity="info"
          icon={<AlertCircle />}
          className="mt-4"
        >
          {t('knowledgeBase.processingComplete')}
        </Alert>
      )}
    </div>
  );
};

export default KnowledgeBase;
