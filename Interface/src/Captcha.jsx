import React, { useState } from 'react';
import CaptchaCode from 'react-captcha-code';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Captcha = () => {
  const [input, setInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('');

  const handleValidate = () => {
    if (input === captchaCode) {
      toast.success('Success! CAPTCHA validated.');
      setCaptchaCode(''); // Reset the CAPTCHA
    } else {
      toast.error('Error! Invalid CAPTCHA.');
    }
    setInput('');
  };

  const handleCaptchaChange = (code) => {
    setCaptchaCode(code);
  };

  return (
    <div>
      <h1>CAPTCHA Validation</h1>
      <div>
        <CaptchaCode
          charCount={6}
          onChange={handleCaptchaChange}
        />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter CAPTCHA"
        />
        <button onClick={handleValidate}>Validate</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Captcha;