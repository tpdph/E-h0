import React from 'react';
import { Box, Typography, Switch, FormControlLabel, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const Settings: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {t('settings.title')}
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          {t('settings.notifications')}
        </Typography>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label={t('settings.enableNotifications')}
        />
      </Box>
    </Box>
  );
};