import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import { AuthProvider } from '@auth/AuthProvider.jsx';
import '@styles/index.css'
import '@fontsource/inder';
import '@fontsource-variable/inter';

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <App />
    </AuthProvider>
);
