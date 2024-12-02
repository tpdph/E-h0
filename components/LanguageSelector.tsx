import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tooltip,
} from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', native: 'English' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', native: 'Español' },
  { code: 'fr', name: 'French', flag: '🇫🇷', native: 'Français' },
  { code: 'de', name: 'German', flag: '🇩🇪', native: 'Deutsch' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺', native: 'Русский' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳', native: '中文' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', native: '日本語' }
];

const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'language-popover' : undefined;

  return (
    <>
      <Tooltip title={t('common.language')} placement="right">
        <IconButton
          onClick={handleClick}
          className="nav-item p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors"
          size="small"
        >
          <LanguageIcon className="w-5 h-5" />
        </IconButton>
      </Tooltip>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <List sx={{ minWidth: 200, maxHeight: 300, overflow: 'auto' }}>
          {languages.map((lang) => (
            <ListItem
              button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              selected={lang.code === i18n.language}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'var(--bg-tertiary)',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {lang.flag}
              </ListItemIcon>
              <ListItemText 
                primary={lang.name}
                secondary={lang.native}
                primaryTypographyProps={{
                  sx: { fontSize: '0.9rem' }
                }}
                secondaryTypographyProps={{
                  sx: { fontSize: '0.8rem' }
                }}
              />
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
};

export default LanguageSelector;
