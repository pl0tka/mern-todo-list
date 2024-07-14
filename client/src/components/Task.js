import { useState } from 'react';

function Task({ singleTask, deleteTask, editTask }) {
  const { task, id } = singleTask;
  const [showEdit, setShowEdit] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  // task buttons
  const handleDeleteClick = () => {
    deleteTask(id);
  };
  const handleEditClick = () => {
    setShowEdit(true);
  };

  // editing
  const handleChange = (e) => {
    setEditedTask(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowEdit(false);
    editTask(id, editedTask);
  };

  let content = (
    <>
      <span>{editedTask}</span>
      <button onClick={handleEditClick}>edit</button>
      <button onClick={handleDeleteClick}>delete</button>
    </>
  );
  if (showEdit) {
    content = (
      <form onSubmit={handleSubmit}>
        <label>Type new task:</label>
        <input value={editedTask} onChange={handleChange} />
        <button>save</button>
      </form>
    );
  }

  return <li>{content}</li>;
}

export default Task;
