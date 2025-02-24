// import React from 'react'
// import ReactDOM from 'react-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import router from './Routes/Routes.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <App />
  </StrictMode>,
)
