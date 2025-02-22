import mongoose from "mongoose";
import Todo from "../models/Todo.js";

// Get all the tasks
export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ message: error.message });
    }
};

// Get a single task
export const getTodo = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid task ID format" });
        }

        const todo = await Todo.findById(id);
        if (!todo) return res.status(404).json({ message: "Task not found" });

        res.status(200).json(todo);
    } catch (error) {
        console.error("Error fetching todo:", error);
        res.status(500).json({ message: error.message });
    }
};

// Create a new task
export const createTodo = async (req, res) => {
    try {
        const { task } = req.body;
        if (!task) {
            return res.status(400).json({ message: "Task field is required" });
        }

        const newTask = new Todo({ task });
        await newTask.save();
        res.status(201).json({ message: "Task created successfully", newTask });
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Error creating task", error: error.message });
    }
};

// Update a task
export const updateTodo = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid task ID format" });
        }

        console.log("Updating task with id:", id);
        const updatedTask = await Todo.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task updated successfully", updatedTask });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Error updating task", error: error.message });
    }
};

// Delete a task
export const deleteTodo = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid task ID format" });
        }

        console.log("Deleting task with id:", id);
        const deleteTask = await Todo.findByIdAndDelete(id);

        if (!deleteTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully", deleteTask });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Error deleting task", error: error.message });
    }
};
