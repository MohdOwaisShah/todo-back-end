const {Schema, model, default: mongoose} = require("mongoose")

// schema for data structure
const TodoSchema = new Schema({
    data : String
})
// model 
const TodoModel = model("todos", TodoSchema)
module.exports = TodoModel