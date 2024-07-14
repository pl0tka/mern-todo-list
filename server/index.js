const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./db');
const Task = require('./models/Task');

const app = express();
const port = process.env.PORT || 8000;

// connect to mongoDB
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/tasks', async (req, res) => {
  const newTask = new Task({
    task: req.body.task,
    id: Math.ceil(Math.random() * 100000),
  });

  try {
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Task.findOneAndDelete({ id: id });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const updatedTask = req.body.task;
  try {
    const task = await Task.findOneAndUpdate(
      { id: id },
      { task: updatedTask },
      { new: true }
    );
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use((req, res) => {
  res.status(404).send('Error 404');
});

app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});
