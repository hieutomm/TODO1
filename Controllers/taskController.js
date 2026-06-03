const mongoose = require("mongoose");
const Todo = require("../models/todo");
const { get } = require("node:http");
const addTask = async (req, res) => {
  try {
    const { name, done } = req.body;
    if (!name) {
      return res.status(401).json({ message: "Thiếu tên " });
    }
    const newTask = await Todo.create({
      name,
      user: req.user.id,
    });
    res.json(newTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const updateTask = async (req, res) => {
  try {
    const task = Todo.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      {
        new: true,
      },
    );
    if (!task) {
      return res.status(403).json({ message: "Không tìm thấy " });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTask = async (req, res) => {
  try {
    const done = req.query.done;
    let filter = {};
    if (done === "true") {
      filter.done = true;
    }
    if (done === "false") {
      filter.done = false;
    }
    const tasks = await Todo.find(filter);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deleteTask = async (req, res) => {
  try {
    const deleted = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!deleted) {
      return res.status(403).json({ message: "Không tìm thấy" });
    }
    res.json({ message: "Đã xóa" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addTask,
  updateTask,
  getTask,
  deleteTask,
};
