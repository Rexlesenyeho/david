const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');






const app = express();
app.use(cors());
app.use(bodyParser.json()); // Parse JSON data

// Create connection to MySQL
const db = mysql.createConnection({
     host: 'localhost',    // or your MySQL host
     user: 'root',         // your MySQL username
     password: 'Rex02', // your MySQL password
     database: 'wings_cafe', // your database name
});


// Connect to MySQL
db.connect((err) => {
     if (err) {
         console.error('Error connecting to MySQL:', err);
     } else {
         console.log('Connected to MySQL');
     }
 });

// API endpoint to insert data into MySQL
app.post('/api/u', (req, res) => {
     const { username, email, age } = req.body;
     const sql = 'INSERT INTO users (username, email, age) VALUES (?, ?, ?)';
     db.query(sql, [username, email, age], (err, result) => {
         if (err) {
             return res.status(500).send(err);
         }
         res.json({ message: 'User added successfully', userId: result.insertId });
     });
 });

 // API endpoint to retrieve users from MySQL
app.get('/api/users', (req, res) => {
     const sql = 'SELECT * FROM users';
     db.query(sql, (err, results) => {
         if (err) {
             return res.status(500).send(err);
         }
         res.json(results);
     });
 });

 // Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
