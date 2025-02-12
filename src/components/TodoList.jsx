import PropTypes from "prop-types";
import TodoListItem from "./TodoListItem";

const TodoList = ({ list, onToggle, onRemoveTodo }) => (
  <ul>
    {list.map(( item ) => (
      <TodoListItem 
        key={item.id} 
        item={item}
        onToggle={onToggle}
        onRemoveTodo={onRemoveTodo}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
          id: PropTypes.number.isRequired, 
          title: PropTypes.string.isRequired, 
          completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onToggle: PropTypes.func.isRequired,
  onRemoveTodo: PropTypes.func,
}

export default TodoList;