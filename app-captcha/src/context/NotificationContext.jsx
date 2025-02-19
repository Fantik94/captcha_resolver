import React, { createContext, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const notifySuccess = (message) => {
    toast.success(message);
  };

  const notifyError = (message) => {
    toast.error(message);
  };

  return (
    <NotificationContext.Provider value={{ notifySuccess, notifyError }}>
      {children}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </NotificationContext.Provider>
  );
}; 