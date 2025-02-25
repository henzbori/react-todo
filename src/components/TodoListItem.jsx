import PropTypes from "prop-types";
import style from "./TodoListItem.module.css";
import { BiSolidTrash } from "react-icons/bi";


const TodoListItem = ({ item, onToggle, onRemoveTodo }) => {
    return (
        <li className={`${style.ListItem} ${item.completed ? style.completed : ''}`}>
             <input
              type="checkbox"
              checked={item.completed}
              onChange={() => onToggle(item.id)}
            />
            <span onClick={() => onToggle(item.id)}>{item.title}</span>
            <BiSolidTrash onClick={() => onRemoveTodo(item)} className={style.trashIcon}/>
        </li>
    );
}

TodoListItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired, 
        title: PropTypes.string.isRequired, 
        completed: PropTypes.bool.isRequired,
    }).isRequired,
    onToggle: PropTypes.func.isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
}

export default TodoListItem;