import PropTypes from "prop-types";
import style from "./TodoListItem.module.css";
import { BiSolidTrash } from "react-icons/bi";


const TodoListItem = ({ item, onToggle, onRemoveTodo }) => {
    return (
        <li style={{ textDecoration: item.completed ? "line-through" : "none" }} className={style.ListItem}>
            <span onClick={() => onToggle(item.id)}>{item.title}</span>
            <BiSolidTrash onClick={() => onRemoveTodo(item)} className={style.trashIcon}/>
        </li>
    );
}

    

TodoListItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string, 
        title: PropTypes.string.isRequired, 
        completed: PropTypes.bool,
    }).isRequired,
    onToggle: PropTypes.func.isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
}

export default TodoListItem;