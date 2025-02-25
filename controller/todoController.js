const mongoose = require("mongoose");
const express = require("express");
const Todo = require("../models/Todo");
const User = require("../models/User");

// Get all the tasks
exports.getAllData = async (req, res) => {
  try {
    const collection = req.params.collection;
    let Model;
    if (collection === "todos") {
      Model = Todo;
    } else if (collection === "users") {
      Model = User;
    }
    const total = await Model.countDocuments();
    const data = await Model.find();
    res.status(200).json({ total, data });
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: error.message });
  }
};
// Get a single task
exports.getData = async (req, res) => {
  try {
    const collection = req.params.collection;
    let Model;
    if (collection === "todos") {
      Model = Todo;
    } else if (collection === "users") {
      Model = User;
    } else {
      return res.status(400).json({ message: "Invalid collection" });
    }
    const data = await Model.findById(req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const collection = req.params.collection;
    let Model;

    if (collection === "todos") {
      Model = Todo;
    } else if (collection === "users") {
      Model = User;
    } else {
      return res.status(400).json({ message: "Invalid collection" });
    }
    const newData = new Model(req.body);
    await newData.save();
    return res.status(201).json({ message: "Created successfully", newData });
  } catch (error) {
    return res.status(500).json({ message: "Error creating", error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const collection = req.params.collection;
    let Model;

    if (collection === "todos") {
      Model = Todo;
    } else if (collection === "users") {
      Model = User;
    } else {
      res.status(400).json({ message: "Invalid collection" });
    }
    const updated = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated){
      return  res.status(404).json({ message: "Document not found" });
    }
    return res.status(200).json({ message: "Updated successfully", updated });
    
  } catch (error) {
    return res.status(500).json({ message: "Error updating", error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const collection = req.params.collection;
    let Model;

    if (collection === "todos") {
      Model = Todo;
    } else if (collection === "users") {
      Model = User;
    } else {
      return res.status(400).json({ message: "Invalid collection" });
    }
    const deleteDocument = await Model.findByIdAndDelete(req.params.id);

    if(!deleteDocument){
      return res.status(404).json({ message: "Document not found" });
    }
    return res.status(200).json({ message: "Deleted successfully", deleteDocument });
   
  } catch (error) {
    return res.status(500).json({ message: "Error deleting", error: error.message });
  }
};

// paginate
exports.getPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const startIndex = (page - 1) * limit;
    const total = await Todo.countDocuments();

    const data = await Todo.find().skip(startIndex).limit(limit);

    res.status(200).json({
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      data: data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error paginating", error: error.message });
  }
};
