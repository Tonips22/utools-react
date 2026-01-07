import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@pages/Home.jsx';
import Dashboard from '@pages/Dashboard.jsx';
import Login from '@pages/Login.jsx';
import NotFound from '@pages/NotFound.jsx';
import Parking from '@pages/Parking.jsx';
import Cursor from "@components/Cursor.jsx";
import Privacy from '@pages/terms/Privacy.jsx';
import Service from '@pages/terms/Service.jsx';
import { ToastProvider } from '@heroui/react';
import { Analytics } from "@vercel/analytics/react";

// Leer variable de entorno
const isParkingMode = import.meta.env.VITE_PARKING === 'true';

function App() {
    // Parking mode activado
    if (isParkingMode) {
        return (
            <Router>
                <Cursor/>
                <Routes>
                    <Route path="*" element={<Parking />} />
                </Routes>
            </Router>
        );
    }

    // Funcionamiento normal de la app
    return (
        <Router>
          <Cursor/>
          <ToastProvider/>
          <Analytics />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/service" element={<Service />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;