import React, { useState, useEffect } from 'react';
import { 
  Box, Button, Typography, Paper, TextField, 
  IconButton, Tooltip, Fade 
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import RefreshIcon from '@mui/icons-material/Refresh';
import VerifiedIcon from '@mui/icons-material/Verified';
import SecurityIcon from '@mui/icons-material/Security';
import CodeIcon from '@mui/icons-material/Code';
import axios from 'axios';
import { useNotification } from '../context/NotificationContext';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  maxWidth: 600,
  margin: '2rem auto',
  padding: '3rem',
  backgroundColor: 'rgba(255, 255, 255, 0.98)',
  borderRadius: theme.spacing(3),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
  }
}));

const CaptchaBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  cursor: 'pointer',
  border: `2px dashed ${theme.palette.primary.main}`,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: alpha(theme.palette.primary.main, 0.03),
  transition: 'all 0.3s ease',
  position: 'relative',
  '&:hover': {
    borderStyle: 'solid',
    transform: 'translateY(-2px)',
    boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.15)}`
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(2),
    backgroundColor: alpha(theme.palette.background.paper, 0.8),
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: alpha(theme.palette.background.paper, 0.95)
    },
    '&.Mui-focused': {
      backgroundColor: alpha(theme.palette.background.paper, 1)
    }
  }
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  padding: theme.spacing(1.5, 3),
  textTransform: 'none',
  fontWeight: 600,
  boxShadow: 'none',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
  }
}));

const CaptchaComponent = () => {
  const [captcha, setCaptcha] = useState(null);
  const [userInput, setUserInput] = useState('');
  const { notifySuccess, notifyError } = useNotification();

  const fetchCaptcha = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/captcha');
      setCaptcha(response.data);
    } catch (error) {
      notifyError('Erreur lors de la récupération du captcha.');
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const refreshCaptcha = () => {
    fetchCaptcha();
    setUserInput('');
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleVerify = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/submit-captcha', {
        id: captcha.id,
        userInput: userInput
      });

      if (response.data.valid) {
        notifySuccess('Captcha validé avec succès !');
      } else {
        notifyError('Captcha incorrect, veuillez réessayer.');
      }
    } catch (error) {
      notifyError('Erreur lors de la vérification du captcha.');
    }

    // Rafraîchir le CAPTCHA après 500 ms
    setTimeout(() => {
      refreshCaptcha();
    }, 500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleVerify();
    }
  };

  const handleRunPythonScript = async () => {
    try {
      const response = await axios.post('http://localhost:8000/solve', {
        url: "http://localhost:3000"
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      console.log('Python script output:', response.data.output);
      notifySuccess('Script Python exécuté avec succès');
    } catch (error) {
      console.error('Error running Python script:', error);
      notifyError('Erreur lors de l\'exécution du script Python');
    }
  };


  return (
    <StyledPaper elevation={0}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <SecurityIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
        <Typography variant="h4" gutterBottom sx={{ 
          fontWeight: 700,
          background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Vérification de Sécurité
        </Typography>
      </Box>

      {captcha ? (
        <Fade in={true}>
          <Box>
            <CaptchaBox onClick={refreshCaptcha}>
              <img id="captcha-img" src={captcha.imageUrl} alt="Captcha" style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: 8
              }} />
              <Tooltip title="Rafraîchir" placement="top">
                <IconButton 
                  sx={{ 
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    '&:hover': { backgroundColor: 'white' }
                  }}
                  onClick={refreshCaptcha}
                >
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            </CaptchaBox>

            <Box sx={{ mb: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Typography variant="body2" sx={{ 
                color: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <CodeIcon fontSize="small" />
                <strong>Type:</strong> {captcha.type}
              </Typography>
              <Typography variant="body2" sx={{ 
                color: 'secondary.main',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <VerifiedIcon fontSize="small" />
                <strong>Valeur:</strong> {captcha.value}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, mx: 'auto' }}>
              <StyledTextField
                fullWidth
                id="captcha-input"
                placeholder="Entrez le code captcha"
                value={userInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <ActionButton
                  id="captcha-verif"
                  variant="contained"
                  onClick={handleVerify}
                  startIcon={<VerifiedIcon />}
                >
                  Vérifier
                </ActionButton>
                
                <ActionButton
                  variant="outlined"
                  color="secondary"
                  onClick={handleRunPythonScript}
                  startIcon={<CodeIcon />}
                >
                  Exécuter le Script Python
                </ActionButton>
              </Box>
            </Box>
          </Box>
        </Fade>
      ) : (
        <Typography variant="body1" color="error.main">
          Chargement du captcha...
        </Typography>
      )}
    </StyledPaper>
  );
};

export default CaptchaComponent;