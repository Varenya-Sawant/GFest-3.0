const connection = require("../mysql");
const { createHash } = require("node:crypto");

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/.test(password);
const validatePhoneNumber = (phone) => /^\+?[\d\s-]{10,}$/.test(phone);

const userRegistrationMiddleware = async (req, res, next) => {
  const { email, username, password, phoneNumber, userTypes, companyName, companyAddress, artisanServiceDescription, artisanProfession } = req.body;

  try {
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({ message: "Invalid password format" });
    }
    if (!validatePhoneNumber(phoneNumber)) {
      return res.status(400).json({ message: "Invalid phone number format" });
    }

    const selectedTypes = Object.values(userTypes).filter(Boolean).length;
    if (selectedTypes === 0) {
      userTypes.COMMON_USER = true;
    }

    const [existingUser] = await connection.query(
      "SELECT user_email FROM users WHERE user_email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(200).json({ message: "Email already registered" });
    }

    const hashedPassword = createHash("sha3-512")
      .update(password, "utf-8")
      .digest("hex");

    await connection.query(
      "INSERT INTO users (user_email, user_name, user_password, user_phone_number) VALUES (?, ?, ?, ?)",
      [email, username, hashedPassword, phoneNumber]
    );

    const userTypeEntries = Object.entries(userTypes);

    for (const [key, value] of userTypeEntries) {
      if (value === true) {
        await connection.query(
          "INSERT INTO user_types (user_email, user_type) VALUES (?, ?)",
          [email, key]
        );

        if (key === 'ARTISIAN') {
          await connection.query(
            `INSERT INTO ${key.toLowerCase()}s (${key.toLowerCase()}_email, ${key.toLowerCase()}_service_description) VALUES (?, ?)`,
            [email, artisanServiceDescription]
          );

          const professsion = await connection.query(
            `INSERT INTO PROFESSIONS (profession_name) VALUES (?)`,
            [artisanProfession]
          );
          console.log({ professsion });

          await connection.query(
            `INSERT INTO ARTISIAN_HAS_PROFESSIONS (artisian_email, profession_id) VALUES (?, ?)`,
            [email, professsion[0].insertId]
          );
        };

        if (key === 'HOST') {
          await connection.query(
            `INSERT INTO ${key.toLowerCase()}s (${key.toLowerCase()}_email, ${key.toLowerCase()}_status, ${key.toLowerCase()}_company_name) VALUES (?, 'APPROVED', ?)`,
            [email, companyName]
          );
        }

        if (key === 'SELLER') {
          await connection.query(
            `INSERT INTO ${key.toLowerCase()}s (${key.toLowerCase()}_email, ${key.toLowerCase()}_status, ${key.toLowerCase()}_company_name, ${key.toLowerCase()}_company_address) VALUES (?, 'APPROVED', ?, ?)`,
            [email, companyName, companyAddress]
          );
        } else {
          // await connection.query(
          //   `INSERT INTO ${key.toLowerCase()}s (${key.toLowerCase()}_email, ${key.toLowerCase()}_status) VALUES (?, ?)`,
          //   [email, 'PENDING']
          // )
        };
      };
    }

    return res.status(201).json({ message: "Registration successful!" });

  } catch (error) {
    console.error("ERROR during registration:", error);
    return res.status(500).json({ message: "Server error during registration" });
  }
};

module.exports = { userRegistrationMiddleware };