const Task = require("../models/Task");

exports.addTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = await Task.create({ title, description, userId: req.user.id });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.user.id, completed: false },
      order: [["createdAt", "DESC"]],
      limit: 5
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.markDone = async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!task) return res.status(404).json({ error: "Task not found" });
    task.completed = true;
    await task.save();
    res.json({ message: "Task completed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};