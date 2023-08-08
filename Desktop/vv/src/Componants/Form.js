import React, { useContext, useState, useEffect } from 'react';
import { TodoContext } from '../Context/TodoContext';

const Form = () => {
  const { todos, setTodos, editTodo, setEditTodo, setStatus } =
    useContext(TodoContext);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    setInputText(editTodo ? editTodo.text : '');
  }, [editTodo]);

  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };

  const submitTodoHandler = (e) => {
    e.preventDefault();
    if (editTodo) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === editTodo.id ? { ...todo, text: inputText } : todo
        )
      );
      setEditTodo(null);
    } else {
      setTodos([
        ...todos,
        { text: inputText, completed: false, id: Math.random() * 1000 },
      ]);
    }
    setInputText('');
  };

  //filter complete, uncomplete, all
  const stateHandler = (e) => {
    setStatus(e.target.value);
  };

  return (
    <form>
      <input
        value={inputText}
        onChange={inputTextHandler}
        type="text"
        className="todo-input"
      />
      <button onClick={submitTodoHandler} className="todo-button" type="submit">
        <i className="fa-solid fa-square-plus"></i>
      </button>
      <div className="select">
        <select onChange={stateHandler} name="todos" className="filter-todo">
          <option value="all">All</option>
          <option value="Completed">Completed</option>
          <option value="Uncompleted">Uncompleted</option>
        </select>
      </div>
    </form>
  );
};

export default Form;
