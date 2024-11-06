import { useState } from 'react'
import './App.css'

function App() {
  const todoList = [
    {id: 1, title: "Complete assignment"},
    {id: 2, title: "Read the book"},
    {id: 3, title: "Watch the video class"},
  ]

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todoList.map(({id, title}) => (<li key={id}>{title}</li>))}
      </ul>
    </div>

  )
}

export default App
