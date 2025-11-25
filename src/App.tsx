import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext";

import Header from './components/Header';
import Footer from './components/Footer';

import KakaoCallback from './pages/KakaoCallback';
import Login from "./pages/Login";
import Home from './pages/Home';
import Profile from './pages/Profile';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="app-wrap">

                    <Header />

                    <div className="page-content">
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/" element={<Home />} />
                            <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
                            <Route path="/profile" element={<Profile />} />
                        </Routes>
                    </div>

                    <Footer />

                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}



export default App;
