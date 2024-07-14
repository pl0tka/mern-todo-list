import axios from 'axios';
import { useState, useEffect } from 'react';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // fetch data
  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:8000/tasks');
    setTasks(response.data);
  };
  // create task
  const createTask = async (task) => {
    const response = await axios.post('http://localhost:8000/tasks', { task });
    const updatedTasks = [...tasks, response.data];
    setTasks(updatedTasks);
  };
  // delete task
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:8000/tasks/${id}`);
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // handle form actions
  const handleSubmit = (e) => {
    e.preventDefault();
    createTask(newTask);
    setNewTask('');
  };
  const handleChange = (e) => {
    setNewTask(e.target.value);
  };
  const handleDeleteClick = (id) => {
    deleteTask(id);
  };

  const renderedTasks = tasks.map((singleTask) => {
    const { task, id } = singleTask;
    return (
      <li key={id}>
        {task}
        <button onClick={() => handleDeleteClick(id)}>delete</button>
      </li>
    );
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="task">New task:</label>
        <input
          value={newTask}
          type="text"
          name="task"
          required
          onChange={handleChange}
        />
        <button>Add New Task</button>
      </form>
      <h1>List of tasks</h1>
      <ol>{renderedTasks}</ol>
    </div>
  );
}

export default ToDoList;
