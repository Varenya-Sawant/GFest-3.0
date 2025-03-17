import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router'; // Corrected import statement
import Navbar from './components/Navbar';
import Forum from './pages/forum/Forum';
import Home from './pages/Home/Home';
import Shop from './pages/shop/Shop'; // Corrected import statement
import Cart from './pages/shop/Cart'; // Corrected import statement
import  OrderConfirmation from './pages/shop/OrderConfirmation'; // Corrected import statement
import { ShopContextProvider } from './context/shop-context';
import ArtisanListing from './pages/services/ArtisanListing';
import ArtisanDetails from './pages/services/ArtisanDetails';
import Contact from './pages/contact/Contact';
import Footer from './components/Footer';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import HostDashboard from './pages/events/HostDashboard';
// import ArtisanDashboard from './pages/services/ArtisanDashboard';
 import SellerDashboard from './pages/shop/SellerDashboard';
// import CulturalFestivals from './pages/home/CulturalFestivals';
import Login from './pages/login/Login';
import SignUp from './pages/login/SignUp';
import Profile from './pages/profile/Profile';
import EventListing from './pages/events/EventListing';
import EventCreationForm from './pages/events/EventCreationForm';
import ProductDetails from './pages/shop/ProductDetails'; // Import the new component

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
              <Route path="/products/:id" element={<ProductDetails />} /> 
              <Route path="/cart" element={<Cart />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/services" element={<ArtisanListing />} />
              <Route path="/services/:email" element={<ArtisanDetails />} />
              <Route path="/contact" element={<Contact />} />
              {/* <Route path="/adminDash" element={<AdminDashboard />} /> */}
              <Route path="/seller/products" element={<SellerDashboard />} />
              {/* <Route path="/artisanDash" element={<ArtisanDashboard bookings={bookings} />} /> */}
              {/* <Route path="/hostDash" element={<HostDashboard />} /> */}
              {/* <Route path="/cultural-festivals" element={<CulturalFestivals />} /> */}
              <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/events" element={<EventListing />} />
              <Route path="/events/create" element={<EventCreationForm />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ShopContextProvider>
  );
};

export default App;