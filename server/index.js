const express = require('express');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let tasks = [];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const newTask = {
    id: Math.ceil(Math.random() * 100000),
    task: req.body.task,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  // id should be converted to a number because id in req.params is a string
  tasks = tasks.filter((task) => task.id !== +id);
  res.status(204).end();
});

app.use((req, res) => {
  res.status(404).send('Error 404');
});

app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});
