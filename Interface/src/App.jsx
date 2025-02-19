import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Captcha from './Captcha';
import Navbar from './Composants/Navbar';
import './App.css';

function App() {
  return (
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Captcha />} />
        </Routes>
    </Router>
  );
}

export default App;