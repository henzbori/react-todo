import './App.css';
import React, {useState} from 'react';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import TodoListItem from './components/TodoListItem';

const Heading = () => <h1>Todo list</h1>

const App = () => {
  const todoList = [
    {
      id: 1, 
      title: "Complete assignment"
    },
    {
      id: 2, 
      title: "Read the book"
    },
    {
      id: 3, 
      title: "Watch the video class"
    },
  ];
  // creaon
  const [newTodo, setNewTodo] = useState("");
  return (
    <div>
      <Heading/>
      <AddTodoForm onAddTodo={setNewTodo}/>
      <p>
        New todo is {newTodo}
      </p>
      <TodoList list={todoList} />
    </div>
  )
}

export default App;
