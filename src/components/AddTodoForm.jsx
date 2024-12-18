import { useState } from "react";
import InputWithLabel from "../InputWithLabel";

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
            <InputWithLabel
                id="todoTitle"
                value={todoTitle} 
                onChange={handleTitleChange}
            >
                <strong>Title: </strong>
            </InputWithLabel> 
            <button type="submit">Add</button>
        </form>
    );
}

export default AddTodoForm;