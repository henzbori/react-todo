import PropTypes from "prop-types";
import TodoListItem from "./TodoListItem";

const TodoList = ({ list, onToggle, onRemoveTodo }) => (
  <ul>
    {list.length === 0 ? (
      <li>No todos available</li>
    ) : (
      list.map(( item ) => (
        <TodoListItem 
          key={item.id} 
          item={item}
          onToggle={onToggle}
          onRemoveTodo={onRemoveTodo}
        />
      ))
    )}
  </ul>
);

TodoList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
          id: PropTypes.string.isRequired, 
          title: PropTypes.string.isRequired, 
          completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onToggle: PropTypes.func.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
}

export default TodoList;