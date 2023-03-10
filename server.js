const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./app/models/index.js');
const app = express();

var corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log('synced db');
  })
  .catch((err) => {
    console.log('Failed to sync db' + err.message);
  });

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to bezkoder application' });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
