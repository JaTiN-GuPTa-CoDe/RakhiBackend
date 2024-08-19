const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Ensure to load environment variables

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { name, email } = req.body;

    // Validate inputs
    if (!name || !email) {
        return res.status(400).send({ message: 'Name and email are required.' });
    }

    // Setup Nodemailer with SMTP
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // Use SSL
        auth: {
            user: process.env.EMAIL_USER, // Environment variable for email
            pass: process.env.EMAIL_PASS // Environment variable for password
        }
    });

    // Create a unique and heartfelt message
    const mailOptions = {
        from: process.env.EMAIL_USER, // Use environment variable for sender email
        to: email,
        subject: `Happy Raksha Bandhan, ${name}!`,
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
                <h2 style="color: #8e44ad;">&#127801; Happy Raksha Bandhan, ${name}! &#127801;</h2>
                <p>Dear <strong>${name}</strong>,</p>
                <p>On this special occasion of Raksha Bandhan, I want to wish you joy, happiness, and prosperity. May this festival strengthen the beautiful bond between you and your sibling, filling your hearts with love and your lives with cherished memories.</p>
                <p style="font-style: italic;">"May the thread of love which binds you together never be broken."</p>
                <p>As you celebrate this joyous festival, may you find peace, laughter, and all the happiness you deserve. Here's to the beautiful connection you share, which only grows stronger with each passing year.</p>
                <p style="font-size: 18px;">Best Wishes,</p>
                <p style="font-size: 18px; color: #e74c3c;">${name}</p>
                <hr>
                <footer style="font-size: 12px; color: #95a5a6;">
                    <p>Sent with love from <strong>${name}</strong></p>
                    <p>&#169; ${new Date().getFullYear()} Raksha Bandhan Wishes</p>
                </footer>
            </div>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send({ message: 'Error sending email' });
        }
        res.send({ message: 'Email sent successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
