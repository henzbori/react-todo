import { useState } from "react";
import InputWithLabel from "../InputWithLabel";
import { GiIBrick, GiJBrick, GiLBrick, GiOBrick, GiSBrick, GiTBrick, GiZBrick } from "react-icons/gi";


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
    const array = [<GiIBrick />, < GiJBrick />, <GiLBrick />, < GiOBrick />, <GiSBrick />, <GiTBrick />, < GiZBrick />];

    const randomIndex = Math.floor(Math.random() * array.length);
    const randomElement = array[randomIndex];

    return (
        <form onSubmit={handleAddTodo}>
            <InputWithLabel
                id="todoTitle"
                value={todoTitle} 
                onChange={handleTitleChange}
            >
                <strong>Title:</strong>
            </InputWithLabel>
            <button type="submit" className="addButton">{randomElement}</button>
        </form>
    );
}

export default AddTodoForm;