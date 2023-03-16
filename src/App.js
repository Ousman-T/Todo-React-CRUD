import { useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';

function App() {
  // implementing useState hook 
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    // get items from the local storage
    const savedTodos = localStorage.getItem('todos');
    console.log(savedTodos);
    // if line 11 requirements are met, set the saved todos to the state
    if(savedTodos && savedTodos !== 'undefined' && savedTodos !== null){
      setTodos(JSON.parse(savedTodos));
    }
  },[]);

  const addTodo = (e) => {
    // checks if the input is empty
    if (e.target.value === "") return;
    // create a todo object
    const newTodo = {
      text: e.target.value,
      id: Date.now(),
      completed: false
    };
    localStorage.setItem('todos', JSON.stringify([newTodo, ...todos]));
    // add new todo to the array
    setTodos([...todos, newTodo])
    // reset the input 
    e.target.value = "";
  };

  const completeTodo = (id, e) => {
    // creating a new copy of todos array
    const todosCopy = [...todos]
    // find the todo that matches the ID
    const indexOfTodo = todosCopy.findIndex(i => i.id === id)
    // updating the completed value to the opposite
    todosCopy[indexOfTodo].completed = !todosCopy[indexOfTodo].completed
    // set the new data into the local storage
    localStorage.setItem('todos', JSON.stringify([...todosCopy]));
    // updating state after side effect
    setTodos([...todosCopy]);
  };

  const deleteTodo = (id) => {
    const todosCopy = [...todos];
    const indexOfTodo = todosCopy.findIndex(i => i.id === id);
    todosCopy.splice(indexOfTodo, 1);
    localStorage.setItem('todos', JSON.stringify([...todosCopy]) );
    setTodos([...todosCopy]);
  }

  const editTodoText = (id, e) => {
    console.log(id);
    const todosCopy = [...todos];
    const indexOfTodo = todosCopy.findIndex(i => i.id === id);
    todosCopy[indexOfTodo].text = e.target.value;
    localStorage.setItem('todos', JSON.stringify([...todosCopy]))
    setTodos([...todosCopy]);
    e.target.value = "";
  }
  return (
    <div className="App">
      <h1>Todo App</h1>
      <TodoList 
      todos={todos} 
      addTodo={addTodo} 
      completeTodo={completeTodo} 
      editTodoText={editTodoText}
      deleteTodo={deleteTodo}/>
    </div>
  );
}

export default App;
