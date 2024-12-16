import {useState, useEffect} from 'react';
import './App.css';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';


const Heading = () => <h1>Todo list</h1>

const useSemiPersistentState = (key, initialValue) => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(key)) || initialValue
  );
  
    useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};

const App = () => {
  const [todoList, setTodoList] = useSemiPersistentState("savedTodoList", "");
  const addTodo = (newTodo) => {
    setTodoList([newTodo, ...todoList]);
  }
  return (
    <>
      <Heading/>
      <AddTodoForm onAddTodo={addTodo}/>
      <TodoList todoList={todoList} />
    </>
  )
}

export default App;
