import React, { useState } from "react";

let  AddTodoForm = ({ onAddTodo }) => { 
    const [todoTitle, setTodoTitle] = useState("");
    const handleTitleChange = (event) => {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    }
    const handleAddTodo = (event) => {
        event.preventDefault();
        onAddTodo({title: todoTitle, id: Date.now() });
        setTodoTitle("");
    }
   
    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Title </label>
            <input 
                type="text" 
                id="todoTitle" 
                placeholder="Enter new todo..."
                name="title" 
                value={todoTitle} 
                onChange={handleTitleChange}
            />
            <br />
            <button type="submit">Add</button>
        </form>
    );
}

export default AddTodoForm;