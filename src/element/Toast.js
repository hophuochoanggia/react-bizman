import React from 'react';
import { ToastContainer } from 'react-toastify';

const Toast = () => (
  <ToastContainer
    position="bottom-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnVisibilityChange
    pauseOnHover
  />
);
export default Toast;
