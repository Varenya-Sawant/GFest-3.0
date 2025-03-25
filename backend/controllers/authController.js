const connection = require("../mysql");
const { createHash } = require("node:crypto");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = createHash("sha3-512")
      .update(password, "utf-8")
      .digest("hex");

    const [users] = await connection.query(
      "SELECT * FROM users WHERE user_email = ? AND user_password = ?",
      [email, hashedPassword]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const [userTypes] = await connection.query(
      "SELECT user_type FROM user_types WHERE user_email = ?",
      [email]
    );

    const token = jwt.sign(
      { email, userTypes: userTypes.map((type) => type.user_type) },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      token,
      user: {
        userTypes: userTypes.map((type) => type.user_type), // e.g., ["HOST"]
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Server error during login" });
  }
};

module.exports = { loginUser };