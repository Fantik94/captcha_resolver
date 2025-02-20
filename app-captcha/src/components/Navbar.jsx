import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container,
  IconButton,
  useTheme
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import SecurityIcon from '@mui/icons-material/Security';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { styled } from '@mui/material/styles';

// Style personnalisé pour les boutons de navigation avec nouvelle couleur
const NavButton = styled(Button)(({ theme, active }) => ({
  margin: theme.spacing(0, 1),
  padding: theme.spacing(1, 3),
  color: 'white',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: active ? '100%' : '0%',
    transform: 'translateX(-50%)',
    height: '3px',
    backgroundColor: '#64b5f6', 
    transition: 'width 0.3s ease-in-out',
    borderRadius: '2px',
    boxShadow: '0 0 8px rgba(100, 181, 246, 0.5)', 
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    '&:after': {
      width: '100%',
    },
  },
}));

// Style personnalisé pour le logo
const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const Navbar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const theme = useTheme();

  return (
    <AppBar 
      position="static" 
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <LogoContainer component={Link} to="/" onClick={() => setActiveTab('/')}>
            <IconButton 
              sx={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
              }}
            >
              <SecurityIcon sx={{ fontSize: 28, color: 'white' }} />
            </IconButton>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700,
                color: 'white',
                letterSpacing: '0.5px',
                textDecoration: 'none'
              }}
            >
              CaptchaResolver
            </Typography>
          </LogoContainer>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <NavButton
              component={Link}
              to="/"
              active={activeTab === '/' ? 1 : 0}
              onClick={() => setActiveTab('/')}
              startIcon={<SecurityIcon />}
            >
              Captcha
            </NavButton>
            <NavButton
              component={Link}
              to="/stats"
              active={activeTab === '/stats' ? 1 : 0}
              onClick={() => setActiveTab('/stats')}
              startIcon={<QueryStatsIcon />}
            >
              Statistiques
            </NavButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;