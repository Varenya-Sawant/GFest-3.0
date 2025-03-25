const connection = require('../mysql');
const { param, validationResult } = require('express-validator');

const getAllArtisans = async (req, res) => {
  try {
    const [rows] = await connection.query(
      `SELECT u.user_email AS email, u.user_name AS name,
              GROUP_CONCAT(p.profession_name) AS professions
       FROM users u
       JOIN ARTISIANS a ON u.user_email = a.artisian_email
       LEFT JOIN ARTISIAN_HAS_PROFESSIONS ahp ON a.artisian_email = ahp.artisian_email
       LEFT JOIN PROFESSIONS p ON ahp.profession_id = p.profession_id
       GROUP BY u.user_email, u.user_name`
    );

    const artisans = rows.map((row) => ({
      email: row.email,
      name: row.name,
      professions: row.professions ? row.professions.split(',') : [],
    }));

    res.status(200).json(artisans);
  } catch (error) {
    console.error('Error fetching artisans:', error);
    res.status(500).json({ message: 'Server error fetching artisans' });
  }
};

const getArtisanByEmail = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
  }

  const { email } = req.params;

  try {
    const [artisanRows] = await connection.query(
      `SELECT u.user_email AS email, u.user_name AS name, 
                u.user_phone_number AS phoneNumber, 
                a.artisian_service_description AS serviceDescription,
                GROUP_CONCAT(p.profession_name) AS professions
         FROM users u
         JOIN ARTISIANS a ON u.user_email = a.artisian_email
         LEFT JOIN ARTISIAN_HAS_PROFESSIONS ahp ON a.artisian_email = ahp.artisian_email
         LEFT JOIN PROFESSIONS p ON ahp.profession_id = p.profession_id
         WHERE u.user_email = ?
         GROUP BY u.user_email, u.user_name, u.user_phone_number, a.artisian_service_description`,
      [email]
    );

    if (artisanRows.length === 0) {
      return res.status(404).json({ message: 'Artisan not found' });
    }

    const artisan = {
      email: artisanRows[0].email,
      name: artisanRows[0].name,
      phoneNumber: artisanRows[0].phoneNumber,
      serviceDescription: artisanRows[0].serviceDescription,
      professions: artisanRows[0].professions ? artisanRows[0].professions.split(',') : [],
    };

    res.status(200).json(artisan);
  } catch (error) {
    console.error('Error fetching artisan:', error);
    res.status(500).json({ message: 'Server error fetching artisan' });
  }
};

module.exports = { getAllArtisans, getArtisanByEmail };