import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';
import { useNavigate } from 'react-router';
import { use } from 'react';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('Sellers');
  const [sellers, setSellers] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingAccounts = async () => {
      try {
        // if the user is not admin then redirect to the home page
        const userTypes = localStorage.getItem('user_type').split(',');
        
        if (!userTypes.includes('ADMIN') || !userTypes) {
          navigate('/');
        }

        const sellerResponse = await axios.get('http://192.168.152.58:3000/api/admin/sellers/pending', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const hostResponse = await axios.get('http://192.168.152.58:3000/api/admin/hosts/pending', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setSellers(sellerResponse.data); // Expecting { seller_email, seller_company_name, seller_status }
        setHosts(hostResponse.data);     // Expecting { host_email, host_company_name, host_status }
        setLoading(false);
      } catch (err) {
        setError('Failed to load accounts.');
        setLoading(false);
      }
    };
    fetchPendingAccounts();
  }, [navigate]);

  const handleApprove = async (email, type) => {
    try {
      const endpoint = type === 'seller' ? 'sellers' : 'hosts';
      await axios.post(
        `http://192.168.152.58:3000/api/admin/${endpoint}/approve`,
        { email },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      if (type === 'seller') {
        setSellers(sellers.filter((seller) => seller.seller_email !== email));
      } else {
        setHosts(hosts.filter((host) => host.host_email !== email));
      }
    } catch (err) {
      alert(`Failed to approve ${type}.`);
    }
  };

  const handleReject = async (email, type) => {
    try {
      const endpoint = type === 'seller' ? 'sellers' : 'hosts';
      await axios.post(
        `http://192.168.152.58:3000/api/admin/${endpoint}/reject`,
        { email },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      if (type === 'seller') {
        setSellers(sellers.filter((seller) => seller.seller_email !== email));
      } else {
        setHosts(hosts.filter((host) => host.host_email !== email));
      }
    } catch (err) {
      alert(`Failed to reject ${type}.`);
    }
  };

  const renderAccounts = () => {
    const accounts = activeSection === 'Sellers' ? sellers : hosts;
    const type = activeSection === 'Sellers' ? 'seller' : 'host';
    const emailKey = type === 'seller' ? 'seller_email' : 'host_email';
    const nameKey = type === 'seller' ? 'seller_company_name' : 'host_company_name';

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    if (accounts.length === 0) return <p>No pending {type}s.</p>;

    return (
      <div className="user-list">
        {accounts.map((user) => (
          <div key={user[emailKey]} className="user-card">
            <h3>{user[nameKey] || 'Unnamed'}</h3>
            <p>Email: {user[emailKey]}</p>
            <p>Role: {type}</p>
            <div className="user-actions">
              <button className="approve-button" onClick={() => handleApprove(user[emailKey], type)}>
                Approve
              </button>
              <button className="reject-button" onClick={() => handleReject(user[emailKey], type)}>
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <h3>Admin Panel</h3>
        <button
          className={`sidebar-item ${activeSection === 'Sellers' ? 'active' : ''}`}
          onClick={() => setActiveSection('Sellers')}
        >
          Sellers
        </button>
        <button
          className={`sidebar-item ${activeSection === 'Hosts' ? 'active' : ''}`}
          onClick={() => setActiveSection('Hosts')}
        >
          Hosts
        </button>
      </div>
      <div className="dashboard-content">
        <h2>Pending {activeSection}</h2>
        {renderAccounts()}
      </div>
    </div>
  );
};

export default AdminDashboard;