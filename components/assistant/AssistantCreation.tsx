import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Tabs, Tab } from '@mui/material';
import { User2, Mic2, Shapes } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import VoiceTraining from '../voice/VoiceTraining';

const MotionPaper = motion(Paper);

const ANIMATIONS = {
  card: {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    tap: { scale: 0.95 }
  },
  icon: {
    hover: {
      rotate: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  }
} as const;

type AssistantTab = 'overview' | 'voice' | 'shape';

const AssistantCreation: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<AssistantTab>('overview');

  const handleTabChange = (event: React.SyntheticEvent, newValue: AssistantTab) => {
    setActiveTab(newValue);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'voice':
        return <VoiceTraining />;
      case 'shape':
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              {t('shape.title')}
            </Typography>
            <Typography variant="body1">
              {t('shape.description')}
            </Typography>
          </Box>
        );
      default:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              {t('assistant.title')}
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 4 }}>
              {t('assistant.description')}
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <MotionPaper
                  whileHover={ANIMATIONS.card.hover}
                  whileTap={ANIMATIONS.card.tap}
                  onClick={() => setActiveTab('voice')}
                  sx={{
                    p: 3,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2
                  }}
                >
                  <motion.div whileHover={ANIMATIONS.icon.hover}>
                    <Mic2 size={48} />
                  </motion.div>
                  <Typography variant="h6">{t('assistant.voice.title')}</Typography>
                  <Typography variant="body2" align="center">
                    {t('assistant.voice.description')}
                  </Typography>
                </MotionPaper>
              </Grid>

              <Grid item xs={12} sm={6}>
                <MotionPaper
                  whileHover={ANIMATIONS.card.hover}
                  whileTap={ANIMATIONS.card.tap}
                  onClick={() => setActiveTab('shape')}
                  sx={{
                    p: 3,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2
                  }}
                >
                  <motion.div whileHover={ANIMATIONS.icon.hover}>
                    <Shapes size={48} />
                  </motion.div>
                  <Typography variant="h6">{t('shape.title')}</Typography>
                  <Typography variant="body2" align="center">
                    {t('shape.description')}
                  </Typography>
                </MotionPaper>
              </Grid>
            </Grid>
          </Box>
        );
    }
  };

  return (
    <Box>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
      >
        <Tab label={t('assistant.title')} value="overview" />
        <Tab label={t('assistant.voice.title')} value="voice" />
        <Tab label={t('shape.title')} value="shape" />
      </Tabs>
      {renderContent()}
    </Box>
  );
};

export default AssistantCreation;
