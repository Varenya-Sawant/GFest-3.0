const connection = require('../mysql');

// Fetch pending sellers
const getPendingSellers = async (req, res) => {
  try {
    const [results] = await connection.query(`
      SELECT seller_email, seller_company_name, seller_status 
      FROM sellers 
      WHERE seller_status = 'pending'
    `);
    res.json(results); // Array of { seller_email, seller_company_name, seller_status }
  } catch (err) {
    console.error('Error fetching pending sellers:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch pending hosts
const getPendingHosts = async (req, res) => {
  try {
    const [results] = await connection.query(`
      SELECT host_email, host_company_name, host_status 
      FROM hosts 
      WHERE host_status = 'pending'
    `);
    res.json(results); // Array of { host_email, host_company_name, host_status }
  } catch (err) {
    console.error('Error fetching pending hosts:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Approve a seller
const approveSeller = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const [result] = await connection.query(`
      UPDATE sellers 
      SET seller_status = 'approved' 
      WHERE seller_email = ?
    `, [email]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Seller not found' });
    }
    res.json({ message: 'Seller approved successfully' });
  } catch (err) {
    console.error('Error approving seller:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Reject a seller
const rejectSeller = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const [result] = await connection.query(`
      UPDATE sellers 
      SET seller_status = 'rejected' 
      WHERE seller_email = ?
    `, [email]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Seller not found' });
    }
    res.json({ message: 'Seller rejected successfully' });
  } catch (err) {
    console.error('Error rejecting seller:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Approve a host
const approveHost = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const [result] = await connection.query(`
      UPDATE hosts 
      SET host_status = 'approved' 
      WHERE host_email = ?
    `, [email]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Host not found' });
    }
    res.json({ message: 'Host approved successfully' });
  } catch (err) {
    console.error('Error approving host:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Reject a host
const rejectHost = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const [result] = await connection.query(`
      UPDATE hosts 
      SET host_status = 'rejected' 
      WHERE host_email = ?
    `, [email]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Host not found' });
    }
    res.json({ message: 'Host rejected successfully' });
  } catch (err) {
    console.error('Error rejecting host:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getPendingSellers,
  getPendingHosts,
  approveSeller,
  rejectSeller,
  approveHost,
  rejectHost,
};