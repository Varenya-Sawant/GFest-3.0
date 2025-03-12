const connection = require("../mysql");
const { createHash } = require("node:crypto");

// Validation functions (same as before)
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/.test(password);
const validatePhoneNumber = (phone) => /^\+?[\d\s-]{10,}$/.test(phone);

const userRegistrationMiddleware = async (req, res, next) => {
  const { email, username, password, phoneNumber, userTypes } = req.body;

  try {
    // Validation
    if (!validateEmail(email)) {
      console.error("ERROR: registerController email");
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (!validatePassword(password)) {
      console.error("ERROR: registerController password");
      return res.status(400).json({ message: "Invalid password format" });
    }
    if (!validatePhoneNumber(phoneNumber)) {
      console.error("ERROR: registerController phoneNumber");
      return res.status(400).json({ message: "Invalid phone number format" });
    }

    // Set default user type if none selected
    const selectedTypes = Object.values(userTypes).filter(Boolean).length;
    if (selectedTypes === 0) {
      userTypes.COMMON_USER = true;
    }

    // Check for existing email
    const [existingUser] = await connection.query(
      "SELECT user_email FROM users WHERE user_email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(200).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = createHash("sha3-512")
      .update(password, "utf-8")
      .digest("hex");

    // Insert user into the database
    await connection.query(
      "INSERT INTO users (user_email, user_name, user_password, user_phone_number) VALUES (?, ?, ?, ?)",
      [email, username, hashedPassword, phoneNumber]
    );

    // Insert user types into the user_types table
    const userTypeEntries = Object.entries(userTypes);
    console.log({
      userTypeEntries
    });

    for (const [key, value] of userTypeEntries) {
      if (value === true) {
        await connection.query(
          "INSERT INTO user_types (user_email, user_type) VALUES (?, ?)",
          [email, key]
        );

        if (key == 'ARTISIAN') {// no triple equal
          await connection.query(
            `INSERT INTO ${key.toLowerCase()}s (${key.toLowerCase()}_email) VALUES (?)`,
            [email]
          );
        } else {
          await connection.query(
            `INSERT INTO ${key.toLowerCase()}s (${key.toLowerCase()}_email, ${key.toLowerCase()}_status) VALUES (?, ?)`,
            [email, 'PENDING']
          )
        };
      };
    }

    // Respond with success
    return res.status(201).json({ message: "Registration successful!" });

  } catch (error) {
    console.error("ERROR during registration:", error);
    return res.status(500).json({ message: "Server error during registration" });
  }
};

module.exports = { userRegistrationMiddleware };