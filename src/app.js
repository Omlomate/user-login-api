const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(bodyParser.json());

// Rate limiter middleware
const otpRequestLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 5,  // Limit each IP to 5 OTP requests per windowMs
    message: 'Too many OTP requests from this IP, please try again later.'
});

app.use('/api/request-otp', otpRequestLimiter);

app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
