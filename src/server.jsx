const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());


const SECRET_KEY = process.env.SECRET_KEY || "default_secret_key";


const users = [
  {
    id: 1,
    username: "testuser",
    password: "$2b$10$kPiv39UL.zXut7E/HqA8t.rAqDWYOLcUo6lCLwQ3f5ymM.qHEEwDi",
    role: "user",
  },
  {
    id: 2,
    username: "admin",
    password: "$2b$10$aWqSU3k4eQkboGIDFqOqkOvPUvEnF9Q2XtRIh9k1kFjMke2YXjAJe",
    role: "admin",
  },
];


const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ error: "Token is required" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};


app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, username, password: hashedPassword, role: "user" };
  users.push(newUser);
  res.status(201).json({ message: "User registered successfully" });
});


app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) {
    console.log("Invalid username:", username);
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    console.log("Invalid password for user:", username);
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY, {
    expiresIn: "1h",
  });
  res.json({ token, message: "Login successful" });
});


app.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});


app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API!" });
});


app.listen(4000, () => console.log("Server running on port 5173"));
