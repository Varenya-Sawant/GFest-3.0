import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import Navbar from './components/Navbar';
import Forum from './pages/forum/Forum';
import Home from './pages/Home/Home';
import { Shop } from "./pages/shop/shop";
import { Cart } from './pages/cart/cart';
import { ShopContextProvider } from "./context/shop-context";
import Services from './pages/services/Services';
import Contact from './pages/contact/Contact';
import Footer from './components/Footer';
import Events from './pages/events/Events';
import AdminDashboard from './pages/admin/AdminDashboard';
import HostDashboard from './pages/events/HostDashboard';
import ArtisanDashboard from './pages/services/ArtisanDashboard';
import SellerDashboard from './pages/shop/SellerDashboard';
import CulturalFestivals from './pages/home/CulturalFestivals';
import Login from './pages/login/Login';
import SignUp from './pages/login/SignUp';
import Profile from './pages/profile/Profile';

const App = () => {
  const [bookings, setBookings] = useState([]);

  return (
    <ShopContextProvider>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/services" element={<Services setBookings={setBookings} />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/events" element={<Events />} />
              <Route path="/adminDash" element={<AdminDashboard />} />
              <Route path="/sellerDash" element={<SellerDashboard />} />
              <Route path="/artisanDash" element={<ArtisanDashboard bookings={bookings} />} />
              <Route path="/hostDash" element={<HostDashboard />} />
              <Route path="/cultural-festivals" element={<CulturalFestivals />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ShopContextProvider>
  );
};

export default App;
