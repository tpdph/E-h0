import React from 'react';
import { Sun, Moon, Palette } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import type { ThemeType } from '../contexts/ThemeContext';
import { Tooltip, Popover, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';

const themes: Array<{
  id: ThemeType;
  name: string;
  gradient: string;
}> = [
  { id: 'purple', name: 'theme.purple', gradient: 'from-[var(--accent-primary)] to-[var(--accent-secondary)]' },
  { id: 'crimson', name: 'theme.crimson', gradient: 'from-[var(--accent-primary)] to-[var(--accent-secondary)]' },
  { id: 'mono', name: 'theme.mono', gradient: 'from-[var(--accent-primary)] to-[var(--accent-secondary)]' },
  { id: 'neon', name: 'theme.neon', gradient: 'from-[#FF1493] via-[#00CED1] to-[#FF1493]' },
  { id: 'ocean', name: 'theme.ocean', gradient: 'from-[#4A00E0] to-[#0066FF]' },
];

export const ThemeSelector: React.FC = () => {
  const { theme, mode, setTheme, toggleMode } = useTheme();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'theme-popover' : undefined;

  return (
    <div className="flex flex-col gap-2">
      <Tooltip title={t('common.theme')} placement="right">
        <IconButton
          onClick={handleClick}
          className="nav-item p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors"
          size="small"
        >
          <Palette className="w-5 h-5" />
        </IconButton>
      </Tooltip>

      <Tooltip title={t('common.toggleTheme')} placement="right">
        <IconButton
          onClick={toggleMode}
          className="nav-item p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors"
          size="small"
        >
          {mode === 'dark' ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
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
        <List sx={{ width: 200 }}>
          {themes.map((themeOption) => (
            <ListItem
              button
              key={themeOption.id}
              onClick={() => {
                setTheme(themeOption.id);
                handleClose();
              }}
              selected={theme === themeOption.id}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'var(--bg-tertiary)',
                },
              }}
            >
              <div className="flex items-center gap-2 w-full">
                <div className={`w-6 h-6 rounded bg-gradient-to-r ${themeOption.gradient}`} />
                <ListItemText primary={t(themeOption.name)} />
              </div>
            </ListItem>
          ))}
        </List>
      </Popover>
    </div>
  );
};

export default ThemeSelector;
