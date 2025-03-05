const sendEmail = async (email, otp) => {
    if (!email) throw new Error('Email param is required');
    if (!otp) throw new Error('OTP params is required');

    try {
        const transposter = createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'varenyasawant23@gmail.com',
                pass: ''
            }
        });

        await transposter.sendMail({
            from: 'varenyasawant23@gmail.com',
            to: email,
            subject: 'OTP',
            text: `Your otp is ${otp}`
        });

        return true;
    } catch (error) {
        console.error(error);
        return false;
    };
};