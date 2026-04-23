const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use('/api/services', require('./routes/services'));
app.use('/api/requests', require('./routes/requests'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/calculator', require('./routes/calculator'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});