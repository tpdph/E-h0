import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Box, Typography, CircularProgress, Alert, Card, CardContent, Button } from '@mui/material';

interface Model {
  id: string;
  name: string;
  description: string;
}

// Mock data for development
const mockModels: Model[] = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    description: 'Advanced language model with superior reasoning capabilities'
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    description: 'Fast and efficient language model for most tasks'
  },
  {
    id: 'claude-2',
    name: 'Claude 2',
    description: 'Anthropic\'s latest model with enhanced capabilities'
  }
];

export const ModelSelector: React.FC = () => {
  const { t } = useTranslation();
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // In development, use mock data
      if (process.env.NODE_ENV === 'development') {
        setTimeout(() => {
          setModels(mockModels.map(model => ({
            id: model.id,
            name: t(`model.types.${model.id}.name`),
            description: t(`model.types.${model.id}.description`)
          })));
          setLoading(false);
        }, 500); // Simulate network delay
        return;
      }

      // In production, try to fetch from API
      const response = await fetch('http://localhost:3001/api/models');
      if (!response.ok) {
        throw new Error(t('model.error.fetch'));
      }
      const data = await response.json();
      setModels(data.models || []);
    } catch (err) {
      console.error('Error fetching models:', err);
      // In development, fall back to mock data if API fails
      if (process.env.NODE_ENV === 'development') {
        setModels(mockModels.map(model => ({
          id: model.id,
          name: t(`model.types.${model.id}.name`),
          description: t(`model.types.${model.id}.description`)
        })));
      } else {
        setError(t('model.error.load'));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleModelSelect = async (modelId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // In development, simulate success
      if (process.env.NODE_ENV === 'development') {
        setTimeout(() => {
          setSelectedModel(modelId);
          setLoading(false);
        }, 500);
        return;
      }

      // In production, make API call
      const response = await fetch('http://localhost:3001/api/load-model', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ modelId }),
      });

      if (!response.ok) {
        throw new Error(t('model.error.load'));
      }

      setSelectedModel(modelId);
    } catch (err) {
      console.error('Error loading model:', err);
      setError(t('model.error.load'));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error && !models.length) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {t('model.select')}
      </Typography>
      <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={2}>
        {models.map((model) => (
          <motion.div
            key={model.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              sx={{
                cursor: 'pointer',
                bgcolor: selectedModel === model.id ? 'primary.main' : 'background.paper',
                color: selectedModel === model.id ? 'primary.contrastText' : 'text.primary',
              }}
              onClick={() => handleModelSelect(model.id)}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {model.name}
                </Typography>
                <Typography variant="body2">
                  {model.description}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};
