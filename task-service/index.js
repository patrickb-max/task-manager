// Induvidual backend File 
// Root level for health check
// Routing levels
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
// mongoose.connect("mongodb+srv://cloudsunny66_db_user:<db_password>@mongo-cluster.ljkkopr.mongodb.net/taskmanager?retryWrites=true&w=majority");
mongoose.connect(process.env.MONGO_URI);


// Define schema + model
const TaskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean
});

const Task = mongoose.model("Task", TaskSchema);

// Root route
app.get("/", (req, res) => {
  res.send("Backend is alive!");
});

// CRUD routes

// GET all tasks
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// POST new task
app.post("/tasks", async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.json(newTask);
});

// PUT update task
app.put("/tasks/:id", async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE task
app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

app.listen(5000, () => console.log("Task Service running on 5000"));
