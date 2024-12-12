import TodoListItem from "./TodoListItem";

const TodoList = ({ todoList }) => (
  <ul>
    {todoList.map(({ id, title }) => (
      <TodoListItem key={id} title={title}/>
      ))}
  </ul>
);


export default TodoList;