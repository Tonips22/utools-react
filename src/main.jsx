import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import '@store/authStore.ts'; // Solo importamos para que se ejecute la inicialización
import '@styles/index.css'
import '@fontsource/inder';
import '@fontsource-variable/inter';

ReactDOM.createRoot(document.getElementById('root')).render(
    <main className='dark'>
        <App />
    </main>
);
