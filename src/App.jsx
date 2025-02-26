
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import { ThemeProvider, useTheme } from "./components/Themecontxt";
import { MdLightMode,  MdDarkMode} from "react-icons/md";
import LandingPage from "./components/LandingPage";
import NavigateButton from "./components/NavigateButton"

const Heading = () => <h1 className="heading">To Do list</h1>;

const ThemeToggleButton = () => {
  const { isLight, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme}  className="addButton">
      { isLight ? <MdDarkMode /> : <MdLightMode /> }
    </button>
  );
};

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const airTableUrl = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const headers = {
    Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
    "Content-Type": "application/json",
  };

  // fetching data
  const fetchData = async () => {
    const url = `${airTableUrl}?view=${"Grid%20view"}&sort%5B0%5D%5Bfield%5D=${"title"}&sort%5B0%5D%5Bdirection%5D=${"asc"}`;
    try {
      const response = await fetch(url, { method: "GET", headers });
      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      
      data.records.sort(function(objectA, objectB) {
        if (objectA.fields.title < objectB.fields.title) {
          return -1;
        } else if (objectA.fields.title > objectB.fields.title) {
          return 1;
        } else {
          return 0;
        }
      })
      const todos = data.records.map(todo => {
        const completed = todo.fields.completed !== undefined ? todo.fields.completed : false;
        return {
          id: todo.id,
          title: todo.fields.title,
          completed: completed,
        };
      });
      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.error("Fetch API error:", error.message);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect((isLoading) => {
    if (!isLoading) localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList]);


  // POST request for adding new todo
  const addTodo = async (newTodo) => {
    const newTodoData = { fields: { title: newTodo.title, completed: false } };
    try {
      const response = await fetch(airTableUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({ records: [{ fields: newTodoData.fields }] }),
      });
      if (!response.ok) throw new Error("Error adding todo");
      fetchData();
    } catch (error) {
      console.error("Error adding todo:", error.message);
    }
  };
  
    // DELETE request for removing todo
  const removeTodo = async (item) => {
    const url = `${airTableUrl}/${item.id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers,
      });
      if (!response.ok) throw new Error("Error removing todo");
      fetchData();
    } catch (error) {
      console.error("Error removing todo:", error.message);
    }
  };

  // PATCH request for toggle todo completion - still working on to make PATCH request running properly 
    const toggleTodo = async (id) => {
      // const updatedTodo = todoList.find(todo => todo.id === id);
      // const updatedFields = { id: updatedTodo.id, completed: !updatedTodo.completed };

      // const url = `${airTableUrl}/${id}`;
      // try {
      //   const response = await fetch(url, {
      //     method: "PATCH",
      //     headers,
      //     body: JSON.stringify({  
      //       records: [{ 
      //         fields: {completed: !updatedTodo.completed}
      //      }]
      //   }),
      // });
      //   if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(`Error toggling todo: ${errorData.error.message}`);
      //   }
      
      // } catch (error) {
      //   console.error("Error toggling todo:", error.message);
      // }  
      setTodoList(prevList =>
          prevList.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
    };

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/todo" element={
            <>
              <ThemeToggleButton />
              <Heading />
              <AddTodoForm onAddTodo={addTodo} list={todoList}/>
              {isLoading ? (
                <p> Loading...</p>
              ) : (
                <TodoList 
                  list={todoList} 
                  onToggle={toggleTodo}
                  onRemoveTodo={removeTodo}
                />
              )}
              <hr />
              <NavigateButton />
            </>
          }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App;
