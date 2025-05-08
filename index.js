const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const TodoModel = require('./models/todo');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Use environment variable for MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Add Todo
app.post("/add", (req, res) => {
  const todoData = req.body.data;
  TodoModel.create({ data: todoData })
    .then(result => res.json(result))
    .catch(error => res.json(error));
});

// Get Todos
app.get("/get", (req, res) => {
  TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

// Delete Todo
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete(id)
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

// Use dynamic port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
