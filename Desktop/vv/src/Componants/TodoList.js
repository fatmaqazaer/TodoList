import React, { useContext } from 'react';
import Todo from './Todo';
import { TodoContext } from '../Context/TodoContext';
import Form from './Form';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMove } from 'react-sortable-hoc';

const TodoList = () => {
  const { filteredTodos, setTodoData } = useContext(TodoContext);

  // Drag and drop by using sortable hoc
  const SortableItem = SortableElement(({ value, index }) => (
    <Todo todoData={value} key={value.id} index={index} />
  ));

  const SortableList = SortableContainer(({ items }) => {
    return (
      <div className='list'>
        {items
          .sort((a, b) => a.position - b.position)
          .map((value, index) => (
            <SortableItem
              value={value}
              index={index}
              key={value.id}
            />
          ))}
      </div>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const updatedTodos = arrayMove(filteredTodos, oldIndex, newIndex).map(
      (todo, index) => ({ ...todo, position: index })
    );
    setTodoData(updatedTodos);
  };

  return (
    <div className='todo-container'>
      <Form />
      <ul className='todo-list'>
      <SortableList items={filteredTodos} onSortEnd={onSortEnd} axis='xy'  />
      </ul>
      {/* <ul className='todo-list'>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <Todo todoData={todo} />
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default TodoList;
