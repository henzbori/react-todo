let  AddTodoForm = (props) => {
    const handleAddTodo = (event) => {
        event.preventDefault();
        const todoTitile = event.target.title.value;
        console.log(todoTitile);
        props.onAddTodo(todoTitile);
        event.target.reset();
    }
    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Title </label>
            <input type="text" id="todoTitle" name="title"/>
            <br />
            <button type="submit">Add</button>
        </form>
    );
}

export default AddTodoForm;