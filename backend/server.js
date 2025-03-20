require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 6001;

app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

