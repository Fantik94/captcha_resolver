import { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, TextField } from '@mui/material';
import axios from 'axios';
import { useNotification } from '../context/NotificationContext';

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

  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: 600,
        margin: '2rem auto',
        padding: '3rem',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 3,
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
        Vérification de Sécurité
      </Typography>

      {captcha ? (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '1.5rem',
              cursor: 'pointer',
              border: '2px dashed #3f51b5',
              borderRadius: 2,
              padding: '1rem',
              backgroundColor: '#f0f2f5',
            }}
            onClick={refreshCaptcha}
          >
            <img id="captcha-img" src={captcha.imageUrl} alt="Captcha" />
          </Box>
          <TextField 
            fullWidth
            variant="outlined"
            placeholder="Entrez le code captcha"
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            sx={{ marginBottom: '1.5rem' }}
            id="captcha-input"
          />
          <Button id="captcha-verif"
            variant="contained"
            color="primary"
            onClick={handleVerify}
            sx={{ width: '100%', padding: '1rem', backgroundColor: '#3f51b5', marginBottom: '1rem' }}
          >
            Vérifier
          </Button>
        </>
      ) : (
        <Typography variant="body1" color="error.main">
          Chargement du captcha...
        </Typography>
      )}
    </Paper>
  );
};

export default CaptchaComponent;