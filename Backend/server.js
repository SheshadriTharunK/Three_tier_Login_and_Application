const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt'); 

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "signup"
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

app.post('/signup', (req, res) => {
  console.log('Register invoked');
  const { name, email, password } = req.body;  // Add 'name' to request body

  // Hash the password using bcrypt
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error hashing password' });
    }

    // Insert the new user into the logininfo table
    const sql = 'INSERT INTO login (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name, email, hash], (err, result) => {  // Pass 'name', 'email', and hashed 'password'
      if (err) {
        return res.status(500).json({ success: false, message: 'Database error' });
      }
      res.status(201).json({ success: true, message: 'User registered successfully' });
    });
  });
});

// Login route to handle login logic
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log([email]);
  const sql = 'SELECT * FROM login WHERE email = ?';
  db.query(sql, [email], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    
    if (result.length === 0) {
      // If no record exists for the provided email
      return res.status(404).json({ success: false, message: 'No record exists' });
    }

    // Check if the password matches
    const user = result[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error comparing passwords' });
      }

      if (isMatch) {
        // If password matches
        res.status(200).json({ success: true, message: 'Login successful' });
      } else {
        // If password doesn't match
        res.status(401).json({ success: false, message: 'Incorrect password' });
      }
    });
  });
});

// Start the server
app.listen(8092, () => {
  console.log("Server is running on port 8092");
});
