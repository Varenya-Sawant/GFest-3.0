import React, { useState } from 'react';
import './Dashboard.css'; // Import the Admin Dashboard styles

const AdminDashboard = () => {
  // Sample states to hold data
  const [users, setUsers] = useState([
    { id: 1, name: 'User 1', email: 'user1@example.com' },
    { id: 2, name: 'User 2', email: 'user2@example.com' },
  ]);
  
  const [hosts, setHosts] = useState([
    { id: 1, name: 'Host 1', status: 'Pending' },
    { id: 2, name: 'Host 2', status: 'Approved' },
  ]);

  const [services, setServices] = useState([
    { id: 1, name: 'Service 1', artisan: 'Artisan 1' },
    { id: 2, name: 'Service 2', artisan: 'Artisan 2' },
  ]);
  
  const [sellers, setSellers] = useState([
    { id: 1, name: 'Seller 1', status: 'Pending' },
    { id: 2, name: 'Seller 2', status: 'Approved' },
  ]);

  // Function to handle user deletion
  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  // Function to handle host approval/rejection
  const handleHostStatusChange = (hostId) => {
    setHosts(hosts.map(host => 
      host.id === hostId ? { ...host, status: host.status === 'Pending' ? 'Approved' : 'Pending' } : host
    ));
  };

  // Function to handle seller approval/rejection
  const handleSellerStatusChange = (sellerId) => {
    setSellers(sellers.map(seller => 
      seller.id === sellerId ? { ...seller, status: seller.status === 'Pending' ? 'Approved' : 'Pending' } : seller
    ));
  };

  // Example function to remove a service (not currently implemented)
  const handleRemoveService = (serviceId) => {
    setServices(services.filter(service => service.id !== serviceId));
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      {/* Users Section */}
      <section>
        <h2>Users Management</h2>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.name} ({user.email})
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>

      {/* Hosts Section */}
      <section>
        <h2>Hosts Management</h2>
        <ul>
          {hosts.map(host => (
            <li key={host.id}>
              {host.name} - {host.status}
              <button onClick={() => handleHostStatusChange(host.id)}>
                {host.status === 'Pending' ? 'Approve' : 'Reject'}
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Services Section */}
      <section>
        <h2>Services Management</h2>
        <ul>
          {services.map(service => (
            <li key={service.id}>
              {service.name} (by {service.artisan})
              <button onClick={() => handleRemoveService(service.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </section>

      {/* Sellers Section */}
      <section>
        <h2>Sellers Management</h2>
        <ul>
          {sellers.map(seller => (
            <li key={seller.id}>
              {seller.name} - {seller.status}
              <button onClick={() => handleSellerStatusChange(seller.id)}>
                {seller.status === 'Pending' ? 'Approve' : 'Reject'}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
