import React from 'react';
import CaptchaComponent from './components/Captcha';
import { NotificationProvider } from './context/NotificationContext';

function App() {
  return (
    <NotificationProvider>
      <div style={{ background: '#f0f2f5', minHeight: '100vh', padding: '2rem' }}>
        <CaptchaComponent />
      </div>
    </NotificationProvider>
  );
}

export default App;