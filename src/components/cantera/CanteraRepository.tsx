import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Chip,
  Container,
  Button,
  CardActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
} from '@mui/material';
import { Play, Crown, Pause, Star, GitBranch, ExternalLink, Trash2, Folder } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BaseItem {
  id: string;
  name: string;
  category: 'default' | 'vip' | 'user';
}

interface VoiceItem extends BaseItem {
  previewUrl: string;
  language: string;
  gender: 'male' | 'female';
  imageUrl?: string;
  description?: string;
}

interface AvatarItem extends BaseItem {
  imageUrl: string;
  description: string;
  tags: string[];
}

const defaultVoices: VoiceItem[] = [
  {
    id: 'morgan',
    name: 'Morgan Freeman',
    category: 'default',
    previewUrl: '/voices/morgan.mp3',
    language: 'en-US',
    gender: 'male',
    imageUrl: '/avatars/morgan.jpg',
    description: 'Deep, authoritative voice with a warm tone',
  },
  {
    id: 'scarlett',
    name: 'Scarlett Johansson',
    category: 'vip',
    previewUrl: '/voices/scarlett.mp3',
    language: 'en-US',
    gender: 'female',
    imageUrl: '/avatars/scarlett.jpg',
    description: 'Smooth, sultry voice with a distinctive character',
  },
];

const defaultAvatars: AvatarItem[] = [
  {
    id: 'morgan',
    name: 'Morgan Freeman',
    category: 'default',
    imageUrl: '/avatars/morgan.jpg',
    description: 'Iconic actor with a distinguished appearance',
    tags: ['actor', 'male', 'distinguished'],
  },
  {
    id: 'scarlett',
    name: 'Scarlett Johansson',
    category: 'vip',
    imageUrl: '/avatars/scarlett.jpg',
    description: 'Renowned actress with a charismatic presence',
    tags: ['actress', 'female', 'charismatic'],
  },
];

const CanteraRepository: React.FC = () => {
  const { t } = useTranslation();
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const handlePlayVoice = (voiceId: string) => {
    if (playingVoice === voiceId) {
      setPlayingVoice(null);
    } else {
      setPlayingVoice(voiceId);
      // Add actual voice playback logic here
    }
  };

  const handleSelectAvatar = (avatarId: string) => {
    setSelectedAvatar(avatarId);
    // Add avatar selection logic here
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {t('cantera.title')}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {t('cantera.description')}
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
          {t('cantera.voices')}
        </Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>
          {t('cantera.voicesDescription')}
        </Typography>
        <Grid container spacing={3}>
          {defaultVoices.map((voice) => (
            <Grid item xs={12} sm={6} md={4} key={voice.id}>
              <Card>
                {voice.imageUrl && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={voice.imageUrl}
                    alt={voice.name}
                  />
                )}
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                      {voice.name}
                    </Typography>
                    {voice.category === 'vip' && (
                      <Crown className="text-yellow-500" />
                    )}
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {voice.description}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Chip
                      label={voice.language}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      label={voice.gender}
                      size="small"
                    />
                  </Box>
                </CardContent>
                <CardActions>
                  <IconButton
                    onClick={() => handlePlayVoice(voice.id)}
                    color={playingVoice === voice.id ? 'primary' : 'default'}
                  >
                    {playingVoice === voice.id ? <Pause /> : <Play />}
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box>
        <Typography variant="h5" gutterBottom>
          {t('cantera.avatars')}
        </Typography>
        <Grid container spacing={3}>
          {defaultAvatars.map((avatar) => (
            <Grid item xs={12} sm={6} md={4} key={avatar.id}>
              <Card
                sx={{
                  border: selectedAvatar === avatar.id ? 2 : 0,
                  borderColor: 'primary.main',
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={avatar.imageUrl}
                  alt={avatar.name}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                      {avatar.name}
                    </Typography>
                    {avatar.category === 'vip' && (
                      <Crown className="text-yellow-500" />
                    )}
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {avatar.description}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    {avatar.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    variant={selectedAvatar === avatar.id ? 'contained' : 'outlined'}
                    onClick={() => handleSelectAvatar(avatar.id)}
                    fullWidth
                  >
                    {selectedAvatar === avatar.id
                      ? t('cantera.selected')
                      : t('cantera.select')}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default CanteraRepository;
