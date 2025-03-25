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

        let hostStatus = null;
        let sellerStatus = null;

        if (userTypeList.includes('HOST')) {
            // get host status from host table
            const [hosts] = await connection.query(
                'SELECT host_status FROM hosts WHERE host_email = ?',
                [email]
            );

            hostStatus = hosts[0].host_status;
        };

        if (userTypeList.includes('SELLER')) {
            // get seller status from seller table
            const [sellers] = await connection.query(
                'SELECT seller_status FROM sellers WHERE seller_email = ?',
                [email]
            );

            sellerStatus = sellers[0].seller_status;
        };

        const user = users[0];

        return res.status(200).json({
            message: 'Your profile details',
            user: {
                email: user.user_email,
                name: user.user_name,
                phone_number: user.user_phone_number,
                userTypes: userTypeList,
                hostStatus,
                sellerStatus
            }
        });
    } catch (error) {
        console.error(error)
    }
};

module.exports = { profileMiddleware };