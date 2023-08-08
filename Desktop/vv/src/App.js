import React from "react";
import "./App.css";
import TodoList from "./Componants/TodoList";
import { TodoProvider } from "./Context/TodoContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditPage from "./Componants/EditPage";

function App() {
  return (
    <TodoProvider>
      <Router>
        <div className="App">
          <header>
            <h1>Todo List</h1>
          </header>
          <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/edit/:EditPageId" element={<EditPage />} />
          </Routes>
        </div>
      </Router>
    </TodoProvider>
  );
}

export default App;
