// Import required modules
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const TodoModel = require('./models/todo') // Import the Mongoose model for todos

const app = express()

// Middleware to enable CORS for all routes and origins
app.use(cors())

// Middleware to parse incoming JSON request bodies
app.use(express.json())

// Connect to MongoDB using Mongoose
mongoose.connect("mongodb+srv://owaisshahh245:rgA8tkjMwZl7ZcR6@cluster0.tywl5yl.mongodb.net/todoapp")


// Route to handle POST request for adding todo data to the database
app.post("/add", (req, res) => {
    const todoData = req.body.data  // Extract todo data from request body
    console.log(todoData)  // Log the data to the console for debugging

    // Create a new todo document in MongoDB
    TodoModel.create({
        data: todoData
    })
    .then(result => res.json(result))  // Send the created document as JSON response
    .catch(error => res.json(error))   // Send error if any occurs
})

// using async await
// app.post("/add", async (req, res) => {
//     const todoData = req.body.data;

//     try {
//         const result = await TodoModel.create({ data: todoData });
//         res.json(result); // Send the created document as JSON response
//     } catch (error) {
//         res.json(error); // Send error if any occurs
//     }
// });

app.get("/get", (req, res) => {
    
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})


// delete
app.delete("/delete:id", (req, res) => {
    // destructuring id
    const {id} = req.params 
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

// Start the server on port 3000
app.listen(3000, () => {
    console.log("server starting")
})
