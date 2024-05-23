const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const dotenv = require('dotenv');
const helmet = require('helmet');

dotenv.config();

connectDB();

const app = express();

app.use(helmet());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

const PORT = process.env.PORT || 3000;

app.get('/', (req,res)=>{
    res.send('Hello World');
})
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

