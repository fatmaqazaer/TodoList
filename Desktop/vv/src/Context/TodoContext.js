import React, { createContext, useState , useEffect } from "react";

export const TodoContext = createContext();

export const TodoProvider = (props) => {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [status, setStatus] = useState('all'); 
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [todoData , setTodoData]  = useState([]);

  //delete icon
  const deleteHandler = (todoId) => {
    setTodos((prevTodos) => prevTodos.filter((el) => el.id !== todoId));
  };

  //check icon
  const completeHandler = (todoId) => {
    setTodos((prevTodos) =>
      prevTodos.map((item) =>
        item.id === todoId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  //edit icon
  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

   //filter complete , uncomplete ,all
   useEffect(() => {
    filterHandler();
  },[todos ,status]);

  const filterHandler = () =>{
    switch(status) {
      case 'Completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true ));
        break;

      case 'Uncompleted' :
        setFilteredTodos(todos.filter(todo => todo.completed === false ));
        break;

        default:
          setFilteredTodos(todos);
          break;

    }

  };
  
  return (
    <TodoContext.Provider
      value={{ completeHandler ,deleteHandler , updateTodo, todos, setTodos, editTodo, setEditTodo, status, setStatus , filteredTodos, setFilteredTodos, todoData , setTodoData }} 
    >
      {props.children}
    </TodoContext.Provider>
  );
};
