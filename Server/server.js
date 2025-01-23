const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection using mysql2
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your MySQL username
  password: "Nipun123@#", // Replace with your MySQL password
  database: "my_database", // Replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    return;
  }
  console.log("Connected to MySQL database");
});

// API endpoint
app.post("/api/submit", (req, res) => {
  const { name, email } = req.body;
  const query = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.query(query, [name, email], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err.message);
      return res.status(500).json({ error: "Failed to insert data" });
    }
    res.json({ message: "Data submitted successfully!" });
  });
});

// // Start server
// app.listen(5000, () => {
//   console.log("Server is running on http://localhost:5000");
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
