const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// Database Connection
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.realestate,
});

// Middleware for verifying token
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "UnAuthorized User" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: "Forbidden Access" });
    }
    req.decoded = decoded;
    next();
  });
};

// Middleware for verifying admin
const verifyAdmin = async (req, res, next) => {
  const requesterEmail = req.decoded.email;
  const [rows] = await db.query("SELECT role FROM users WHERE email = ?", [requesterEmail]);
  if (!rows[0] || rows[0].role !== "admin") {
    return res.status(403).send({ message: "Forbidden Access" });
  }
  next();
};

// Sign-up a new user
app.post("/sign-up", async (req, res) => {
  const { email, password, role } = req.body;
  const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

  if (existing.length === 0) {
    await db.query("INSERT INTO users (email, password, role) VALUES (?, ?, ?)", [email, password, role]);
    res.send({ status: true, message: "User created successfully" });
  } else {
    res.send({ status: false, error: "User already exists" });
  }
});

// Login user
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

  if (rows.length > 0 && rows[0].password === password) {
    const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
    res.send({ status: true, user: rows[0], token });
  } else {
    res.send({ status: false, error: "Authentication Error" });
  }
});

// Add a new property
app.post("/property", async (req, res) => {
  const { property_use, price, monthly_rent, lease_term, ...propertyData } = req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO properties (property_use, owner_email, status) VALUES (?, ?, 'available')",
      [property_use, propertyData.owner_email]
    );

    const propertyId = result.insertId;

    if (property_use === "rental") {
      await db.query("INSERT INTO property_rentals (property_id, monthly_rent, lease_term) VALUES (?, ?, ?)", [
        propertyId,
        monthly_rent,
        lease_term,
      ]);
    } else if (property_use === "sale") {
      await db.query("INSERT INTO property_sales (property_id, price) VALUES (?, ?)", [propertyId, price]);
    }

    res.send({ success: true, message: "Property added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to add property" });
  }
});

// Get all available properties
app.get("/property", async (req, res) => {
  try {
    const [properties] = await db.query(`
      SELECT p.*, pr.monthly_rent, pr.lease_term, ps.price
      FROM properties p
      LEFT JOIN property_rentals pr ON p.id = pr.property_id
      LEFT JOIN property_sales ps ON p.id = ps.property_id
      WHERE p.status = 'available'
    `);

    res.send(properties.reverse());
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to fetch properties" });
  }
});

// Delete property
app.delete("/property/:id", verifyJWT, verifyAdmin, async (req, res) => {
  const id = req.params.id;

  try {
    await db.query("DELETE FROM property_rentals WHERE property_id = ?", [id]);
    await db.query("DELETE FROM property_sales WHERE property_id = ?", [id]);
    await db.query("DELETE FROM applications WHERE property_id = ?", [id]);
    await db.query("DELETE FROM properties WHERE id = ?", [id]);

    res.send({ success: true, message: "Property deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to delete property" });
  }
});

// Check if user is admin
app.get("/admin/:email", verifyJWT, async (req, res) => {
  const email = req.params.email;

  const [rows] = await db.query("SELECT role FROM users WHERE email = ?", [email]);
  res.send({ isAdmin: rows[0]?.role === "admin" });
});

// Handle user deletion
app.delete("/user/:email", verifyJWT, verifyAdmin, async (req, res) => {
  const email = req.params.email;

  try {
    await db.query("DELETE FROM properties WHERE owner_email = ?", [email]);
    await db.query("DELETE FROM applications WHERE applicant_email = ?", [email]);
    await db.query("DELETE FROM users WHERE email = ?", [email]);

    res.send({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to delete user" });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
