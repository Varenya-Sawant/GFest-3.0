// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Forum from './pages/Forum'; 
import Home from './pages/Home'; 
import Shop from './pages/Shop'; 
import Services from './pages/Services'; 
import Contact from './pages/Contact';
import Footer from './components/Footer';
import Events from './pages/Events';
import AdminDashboard from './pages/AdminDashboard';
import HostDashboard from './pages/HostDashboard';
import ArtisanDashboard from './pages/ArtisanDashboard';
import SellerDashboard from './pages/SellerDashboard';
import CulturalFestivals from './pages/CulturalFestivals';
import LoginSignUp from './pages/loginSignup';

const App = () => {
  const [bookings, setBookings] = useState([]); 

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/services" element={<Services setBookings={setBookings} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/events" element={<Events />} />
            <Route path="/adminDash" element={<AdminDashboard />} />
            <Route path="/sellerDash" element={<SellerDashboard />} />
            <Route path="/artisanDash" element={<ArtisanDashboard bookings={bookings} />} />
            <Route path="/hostDash" element={<HostDashboard />} />
            <Route path="/cultural-festivals" element={<CulturalFestivals />} />
            <Route path="/login-signup" element={<LoginSignUp />} /> 
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
