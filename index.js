// const express = require("express");
// const connectToDatabase = require("./connection");

// const app = express();

// // call the connection
// connectToDatabase();

// app.get("/", (req, res) => {
//   res.send("Server running");
// });

// app.listen(5000, () => {
//   console.log("Server started on port 5000");
// });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectToDatabase = require("./connection");
const login = require("./login");
const student = require("./student");
const studentModel = require("./studentModel");

const app = express();
const PORT = 5000;

// middleware
app.use(cors());
app.use(express.json());

const cookieParser = require("cookie-parser");

app.use(cookieParser());


app.use(express.json());
app.use("/student", student);

// MongoDB connection
connectToDatabase();

/* =========================
   POST API - Add Student
   ========================= */
// app.post("/api/students", async (req, res) => {
//   try {
//     const student = new Student(req.body);
//     await student.save();
//     res.status(201).json(student);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

/* =========================
   GET API - Get All Students
   ========================= */
// app.get("/api/students", async (req, res) => {
//   try {
//     const students = await Student.find();
//     res.json(students);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

