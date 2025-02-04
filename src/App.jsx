import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';



const Heading = () => <h1 className="heading">Todo list</h1>

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      }
    };
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      const todos = data.records.map((todo)=> {
        const newTodo =  {
          id: todo.id,
          title: todo.fields.title
        }
        return newTodo;
      })
      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.error("Fetch API error:", error.message);
      setIsLoading(false);
      throw error;
    }
  }
  useEffect(() => {
    fetchData();
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
    <Router>
      <Routes>
         <Route path="/" element={
          <>
            <Heading />
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
        }
        />
        <Route path="/new" element={
          <>
            <h1>New Todo List</h1>
          </>
        }
        />
      </Routes>
    </Router>
  )
}

export default App;
