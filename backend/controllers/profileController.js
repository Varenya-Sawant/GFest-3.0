const connection = require('../mysql'); // Your MySQL connection file

const profileMiddleware = async (req, res) => {
    const { email } = req.body;

    try {
        // Basic validation
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const [users] = await connection.query(
            'SELECT user_email, user_name, user_phone_number FROM users WHERE user_email = ?',
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({ message: 'Invalid user' });
        }

        const [userTypes] = await connection.query(
            'SELECT user_type FROM user_types WHERE user_email = ?',
            [email]
        );
        const userTypeList = userTypes.map((type) => type.user_type);

        const user = users[0];

        return res.status(200).json({
            message: 'Your profile details',
            user: {
                email: user.user_email,
                name: user.user_name,
                phone_number: user.user_phone_number,
                userTypes: userTypeList
            }
        });
    } catch (error) {
        console.error(error)
    }
};

module.exports = { profileMiddleware };