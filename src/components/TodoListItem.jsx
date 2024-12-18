const TodoListItem = ({ item, onRemoveTodo }) => 
<>
    <li>{item.title} <button type="button" onClick={() => onRemoveTodo(item)}>Remove</button></li>
</>

export default TodoListItem;