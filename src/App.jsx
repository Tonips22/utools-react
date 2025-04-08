import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@pages/Home.jsx';
import Dashboard from '@pages/Dashboard.jsx';
import Login from '@pages/Login.jsx';
import Cursor from "@components/Cursor.jsx";
import Privacy from '@pages/terms/Privacy.jsx';
import Service from '@pages/terms/Service.jsx';



function App() {
    return (
        <Router>
          <Cursor/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/service" element={<Service />} />
            </Routes>
        </Router>
    );
}

export default App;