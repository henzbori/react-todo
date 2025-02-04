import style from "../TodoListItem.module.css";
import { BiSolidTrash } from "react-icons/bi";


const TodoListItem = ({ item, onRemoveTodo }) => 
<>
    <li className={style.ListItem}>{item.title} <BiSolidTrash className={style.trashIcon} onClick={() => onRemoveTodo(item)}/> </li>
</>

export default TodoListItem;