import axios from 'axios';
import { useState, useEffect } from 'react';

import useFetch from '../hooks/useFetch';
import Task from './Task';
import { backendURL } from '../utils/utils';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // create task
  const createTask = async (task) => {
    const response = await axios.post(`${backendURL}/tasks`, { task });
    const updatedTasks = [...tasks, response.data];
    setTasks(updatedTasks);
  };
  // delete task
  const deleteTask = async (id) => {
    await axios.delete(`${backendURL}/tasks/${id}`);
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };
  // edit task
  const editTask = async (id, task) => {
    const response = await axios.put(`${backendURL}/tasks/${id}`, {
      task,
    });
    const updatedTasks = tasks.map((singleTask) =>
      singleTask.id === id ? { ...response.data } : singleTask
    );
    setTasks(updatedTasks);
  };

  // fetch data
  const [data, loading, error] = useFetch(`${backendURL}/tasks`);

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data]);

  // render content depending on the response
  let content;
  if (loading) {
    content = <p>loading...</p>;
  } else if (error) {
    content = <p>{error}</p>;
  } else {
    content = tasks.map((singleTask) => {
      return (
        <Task
          key={singleTask.id}
          singleTask={singleTask}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      );
    });
  }

  // handle form actions
  const handleSubmit = (e) => {
    e.preventDefault();
    createTask(newTask);
    setNewTask('');
  };
  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

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
      <ol>{content}</ol>
    </div>
  );
}

export default ToDoList;
