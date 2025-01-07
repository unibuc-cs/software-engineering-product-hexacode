import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";

function App() {
    return (
        <Router>
            <Header />
            <div className="main-content">
                <Routes>

                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/signup" element={<SignUp />} />

                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;