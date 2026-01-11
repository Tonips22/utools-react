import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '@pages/Home.jsx';
import Search from '@pages/Search.jsx';
import Dashboard from '@pages/Dashboard.jsx';
import MyPosts from '@pages/dashboard/MyPosts.jsx';
import Profile from '@pages/dashboard/Profile.jsx';
import Login from '@pages/Login.jsx';
import NotFound from '@pages/NotFound.jsx';
import Cursor from "@components/Cursor.jsx";
import Privacy from '@pages/terms/Privacy.jsx';
import Service from '@pages/terms/Service.jsx';
import { ToastProvider } from '@heroui/react';
import { Analytics } from "@vercel/analytics/react";


function App() {
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