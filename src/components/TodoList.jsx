let TodoList = () => {
  const todoList = [
    {id: 1, title: "Complete assignment"},
    {id: 2, title: "Read the book"},
    {id: 3, title: "Watch the video class"},
  ]

  return (
    <ul>
      {todoList.map(({id, title}) => (<li key={id}>{title}</li>))}
    </ul>
  )
};

export default TodoList;