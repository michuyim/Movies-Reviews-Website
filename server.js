const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./server/config/dbConnect');
const signup = require('./server/routes/SignupRoute');
const login = require('./server/routes/LoginRoute');
const reviews = require('./server/routes/reviewRoute');
const protectedRoute = require('./server/routes/protectedRoute'); // Adjust path as needed

dotenv.config({ path: '.env' });

const app = express();
const PORT = process.env.PORT || 2003;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors({
    origin: 'https://localhost:3000',
    credentials: true
}));
app.use(cookieParser());

// Use the signup and login routes with a prefix
app.use('/api', signup);
app.use('/api', login);
app.use('/api', reviews);
app.use(protectedRoute);

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});