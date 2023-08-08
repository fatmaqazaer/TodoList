// Todo.js
import React, { useContext } from "react";
import { TodoContext } from "../Context/TodoContext";
import { useNavigate } from "react-router-dom";

const Todo = ({ todoData }) => {
  const { deleteHandler, completeHandler, setEditTodo } = useContext(TodoContext);
  const navigate = useNavigate();
  const handleEdit = () => {
    setEditTodo({ id: todoData.id, text: todoData.text });
    navigate(`/edit/${todoData.id}`);
  };

  return (
    <div className="todo">
      <li className={`todo-item ${todoData.completed ? "completed" : ""}`}>
        {todoData.text}
      </li>
      <button onClick={() => completeHandler(todoData.id)} className="completed-btn">
        <i className="fas fa-check"></i>
      </button>
      {!todoData.completed ? (
        <>
          <button onClick={handleEdit} className="edit-btn">
            <i className="fas fa-edit"></i>
          </button>
        </>
      ) : null}
      <button onClick={() => deleteHandler(todoData.id)} className="trash-btn">
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default Todo;
