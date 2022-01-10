const Task = require("../models/task");

const getAllTasks = (req, res) => {
  Task.find({}, (err, result) => {
    if (!err) {
      return res.status(200).json({ success: true, data: result });
    }
    res.status(404).json({ success: false, data: err });
  });
};

const createTask = (req, res) => {
  const newTask = new Task({
    name: req.body.name,
  });
  newTask.save((err, result) => {
    if (!err) {
      return res.status(201).json({ success: true, data: result });
    }
    res.status(404).json({ success: false, data: err.message });
  });
};

const getTask = (req, res) => {
  const id = req.params.id;
  Task.findById(id, (err, result) => {
    if (!err) {
      return res.status(200).json({ success: true, data: result });
    }
    res.status(404).json({ success: false, data: err });
  });
};

const updateTask = (req, res) => {
  const id = req.params.id;

  Task.findByIdAndUpdate(
    id,
    req.body,
    { new: true, runValidators: true },
    (err, result) => {
      if (!err) {
        return res.status(200).json({ success: true, data: result });
      }
      res.status(404).json({ success: false, data: err });
    }
  );
};

const deleteTask = (req, res) => {
  const id = req.params.id;
  Task.findByIdAndDelete(id, (err, result) => {
    if (!err) {
      return res.status(200).json({ success: true, data: result });
    }
    res.status(404).json({ success: false, data: err });
  });
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
