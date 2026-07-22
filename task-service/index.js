const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

// Root route for health check
app.get("/", (req, res) => {
  res.send("Backend is alive!");
});

// Example route
app.get("/tasks", (req, res) => {
  res.json([{ id: 1, title: "Learn Svelte" }]);
});

app.listen(5000, () => console.log("Task Service running on 5000"));
