import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About';
import Users from './pages/Users';
import NotFound from './pages/NotFound';
import PrivateRoute from './routes/PrivateRoute';
import { useAppSelector } from './hooks';

const App: React.FC = () => {
    const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);

    return (
        <Router>
            <NavBar />
            <main style={{ padding: '2em', maxWidth: 900, margin: '0 auto' }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route
                        path="/users"
                        element={
                            <PrivateRoute isAuthenticated={isAuthenticated}>
                                <Users />
                            </PrivateRoute>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </Router>
    );
};

export default App;