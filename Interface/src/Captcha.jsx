import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Captcha = () => {
  const [captcha, setCaptcha] = useState('');
  const [input, setInput] = useState('');
  const [captchaImage, setCaptchaImage] = useState(null);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptcha(result);
    drawCaptcha(result);
  };

  const drawCaptcha = (text) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 150;
    canvas.height = 50;
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = '24px Arial';
    context.fillStyle = '#000';
    context.fillText(text, 20, 30);
    setCaptchaImage(canvas.toDataURL());
  };

  const handleValidate = () => {
    if (input === captcha) {
      toast.success('Success! CAPTCHA validated.');
      generateCaptcha();
    } else {
      toast.error('Error! Invalid CAPTCHA.');
    }
    setInput('');
  };

  return (
    <div>
      <h1>CAPTCHA Validation</h1>
      <div>
        {captchaImage && <img src={captchaImage} alt="CAPTCHA" />}
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
