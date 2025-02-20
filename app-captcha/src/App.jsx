import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, CssBaseline } from '@mui/material';
import CaptchaComponent from './components/Captcha';
import Stats from './components/Stats';
import { NotificationProvider } from './context/NotificationContext';
import Navbar from './components/Navbar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
      dark: '#283593',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NotificationProvider>
          <div>
            <Navbar />
            <Container sx={{ py: 4 }}>
              <Routes>
                <Route path="/" element={<CaptchaComponent />} />
                <Route path="/stats" element={<Stats />} />
              </Routes>
            </Container>
          </div>
        </NotificationProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;