import TodoListItem from "./TodoListItem";

const TodoList = (props) => {
  return (
    <ul>
      {props.list.map((item) => (
        <TodoListItem key={item.id} title={item.title}/>
        ))}
    </ul>
  );
};

export default TodoList;