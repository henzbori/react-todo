import React, {useState} from 'react';
import './App.css';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';


const Heading = () => <h1>Todo list</h1>

const App = () => {
  // const todoList = [
  //   {
  //     id: 1, 
  //     title: "Complete assignment"
  //   },
  //   {
  //     id: 2, 
  //     title: "Read the book"
  //   },
  //   {
  //     id: 3, 
  //     title: "Watch the video class"
  //   },
  // ];
  // creating state
  
  const [todoList, setTodoList] = useState([]);
  const addTodo = (newTodo) => {
    setTodoList([newTodo, ...todoList]);
  }
  return (
    <div>
      <Heading/>
      <AddTodoForm onAddTodo={addTodo}/>
      <TodoList todoList={todoList} />
    </div>
  )
}

export default App;
