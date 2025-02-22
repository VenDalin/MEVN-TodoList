import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    task:{type: String, required: true},   
    completed:{type: Boolean, default: false},
    createdAt:{type: Date, default: Date.now}
})

export default mongoose.model('Todo', todoSchema);