import React, { useContext, useState, useEffect } from "react";
import { TodoContext } from "../Context/TodoContext";
import { useNavigate, useParams } from "react-router-dom";

const EditPage = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const [inputText, setInputText] = useState('');
  const navigate = useNavigate();
  let { EditPageId } = useParams();

  useEffect(() => {
    if (EditPageId) {
      const editTodo = todos.find((todo) => todo.id === parseFloat(EditPageId));
      if (editTodo) {
        setInputText(editTodo.text);
      }
    }
  }, [todos, EditPageId]);

  const handleUpdate = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === parseFloat(EditPageId) ? { ...todo, text: inputText } : todo
      )
    );
    navigate("/");
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <input
        value={inputText}
        type="text"
        className="todo-input"
        onChange={(e) => setInputText(e.target.value)}
      />
      <button
        style={{
          padding: '8px 16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        onClick={handleUpdate}
      >
        Update
      </button>
    </div>
  );
};

export default EditPage;
