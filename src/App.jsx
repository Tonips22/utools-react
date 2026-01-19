import { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Home from '@pages/Home.jsx';
const Home = lazy(() => import('@pages/Home.jsx'));
const Search = lazy(() => import('@pages/Search.jsx'));
const Login = lazy(() => import('@pages/Login.jsx'));
const Dashboard = lazy(() => import('@pages/Dashboard.jsx'));
const MyPosts = lazy(() => import('@pages/dashboard/MyPosts.jsx'));
const Profile = lazy(() => import('@pages/dashboard/Profile.jsx'));
const NotFound = lazy(() => import('@pages/NotFound.jsx'));
const Cursor = lazy(() => import('@components/Cursor.jsx'));
const Privacy = lazy(() => import('@pages/terms/Privacy.jsx'));
const Service = lazy(() => import('@pages/terms/Service.jsx'));
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