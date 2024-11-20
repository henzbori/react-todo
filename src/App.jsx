import './App.css';
import React from 'react';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';

const Heading = () => <h1>Todo list</h1>

const App = () => (
  <div>
    <Heading/>
    <AddTodoForm/>
    <TodoList/>
  </div>
)

export default App;
