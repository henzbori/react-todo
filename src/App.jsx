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
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?view=${"Grid%20view"}&sort%5B0%5D%5Bfield%5D=${"title"}&sort%5B0%5D%5Bdirection%5D=${"asc"}`;
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      data.records.sort(function(objectA, objectB) {
        if (objectA.fields.title < objectB.fields.title) {
          return -1;
        } else if (objectA.fields.title > objectB.fields.title) {
          return 1;
        } else {
          return 0;
        }
      })
      const todos = data.records.map((todo)=> {
        const newTodo =  {
          id: todo.id,
          title: todo.fields.title,
          completed: todo.fields.completed,
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

    const toggleTodo = (item) => {
    setTodoList((todoList) =>
      todoList.map((todo) =>
        todo.id === item ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

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
                onToggle={toggleTodo}
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
