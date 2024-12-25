import {useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';


const Heading = () => <h1>Todo list</h1>

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    new Promise((resolve, reject) => 
      setTimeout(
        () => resolve({data: { todoList: JSON.parse(localStorage.getItem("savedTodoList")) } }),
      2000
      )
    ).then((result) => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    })
  }, []);
  
  useEffect(() => {
    !(isLoading) && localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList]);

  const removeTodo = (item) => {
    const filteredTodo = todoList.filter(
    (todo) => item.id !== todo.id
    );
    setTodoList(filteredTodo);
  }
  const addTodo = (newTodo) => {
    setTodoList([newTodo, ...todoList]);
  }
  return (
    <>
      <Heading/>
      <AddTodoForm onAddTodo={addTodo}/>
      {isLoading ? (
        <p> Loading...</p>
      ) : (
        <TodoList 
          list={todoList} 
          onRemoveTodo={removeTodo}
        />
      )}
    </>
  )
}

export default App;
