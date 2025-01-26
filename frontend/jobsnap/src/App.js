import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import CVBuilder from "./pages/CVBuilder";
import Profile from './pages/Profile';
import Cv_jobtypes from './pages/Cv_jobtypes';
import EditCV from './pages/EditCV';
import UploadPageStudent from './pages/UploadPageStudent';
import UploadPageEmployer from './pages/UploadPageEmployer';
import CVDetailPage from './pages/CVDetailPage';
import { AuthProvider } from "./context/AuthContext";


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
                        <Route path="/start" element={<Cv_jobtypes />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/create-cv/:cvType" element={<CVBuilder />} />
                        <Route path="/edit-cv/:cvId" element={<EditCV />} />
                        <Route path="/upload-cv-student" element={<UploadPageStudent />} />
                        <Route path="/upload-cv-page" element={<UploadPageEmployer />} />
                        <Route path="/cv-detail/${cvId}`" element={<CVDetailPage />} />


                    </Routes>
                 </div>
                 <Footer />
            </Router>
    );
}

export default App;
