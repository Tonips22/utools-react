import { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from '@heroui/react';
import { Analytics } from "@vercel/analytics/react";

const Home = lazy(() => import('@pages/Home.jsx'));
const Search = lazy(() => import('@pages/Search.jsx'));
const Login = lazy(() => import('@pages/Login.jsx'));
const Dashboard = lazy(() => import('@pages/Dashboard.jsx'));
const MyPosts = lazy(() => import('@pages/dashboard/MyPosts.jsx'));
const Profile = lazy(() => import('@pages/dashboard/Profile.jsx'));
const Admin = lazy(() => import('@pages/dashboard/Admin.jsx'));
const NotFound = lazy(() => import('@pages/NotFound.jsx'));
const Cursor = lazy(() => import('@components/Cursor.jsx'));
const Privacy = lazy(() => import('@pages/terms/Privacy.jsx'));
const Service = lazy(() => import('@pages/terms/Service.jsx'));
const Parking = lazy(() => import('@pages/Parking.jsx'));

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
                <Route path="/search" element={<Search />} />
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route index element={<Navigate to="/dashboard/my-posts" replace />} />
                    <Route path="my-posts" element={<MyPosts />} />
                    <Route path="admin" element={<Admin />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/service" element={<Service />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;