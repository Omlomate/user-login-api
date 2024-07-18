const db = require('../utils/db');
const generateOtp = require('../utils/otpGenerator');
const sendEmail = require('../services/emailService');
const jwt = require('jsonwebtoken');

const registerUser = (req, res) => {
    const { email } = req.body;

    db.run(`INSERT INTO users (email) VALUES (?)`, [email], function(err) {
        if (err) {
            return res.status(400).json({ message: 'Email already registered.' });
        }
        res.json({ message: 'Registration successful. Please verify your email.' });
    });
};

const requestOtp = (req, res) => {
    const { email } = req.body;
    const otp = generateOtp();

    db.run(`INSERT INTO otps (email, otp) VALUES (?, ?)`, [email, otp], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Failed to generate OTP.' });
        }
        sendEmail(email, 'Your OTP Code', otp);
        res.json({ message: 'OTP sent to your email.' });
    });
};

const verifyOtp = (req, res) => {
    const { email, otp } = req.body;

    db.get(`SELECT * FROM otps WHERE email = ? ORDER BY created_at DESC LIMIT 1`, [email], (err, row) => {
        if (err || !row || row.otp !== otp) {
            return res.status(400).json({ message: 'Invalid or expired OTP.' });
        }

        const token = jwt.sign({ email }, 'secret_key', { expiresIn: '1h' });  // Replace 'secret_key' with an actual secret key
        res.json({ message: 'Login successful.', token });
    });
};

module.exports = {
    registerUser,
    requestOtp,
    verifyOtp
};
