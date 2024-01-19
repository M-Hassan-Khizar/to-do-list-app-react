// Import React and necessary components

import React, { useState, useEffect } from "react";
import "./App.css"; // Importing styles
import { AiOutlineDelete } from "react-icons/ai"; // Importing delete icon
import { BsCheckLg } from "react-icons/bs"; // Importing check icon

function App() {
  // State for all todos
  const [allTodos, setAllTodos] = useState([]);
  // State for new todo title
  const [newTodoTitle, setNewTodoTitle] = useState("");
  // State for new todo description
  const [newDescription, setNewDescription] = useState("");
  // State for completed todos
  const [completedTodos, setCompletedTodos] = useState([]);
  // State to toggle between To Do and Completed screens
  const [isCompletedScreen, setIsCompletedScreen] = useState(false);

  // Function to add a new todo
  const handleAddNewToDo = () => {
    let newToDoObj = {
      title: newTodoTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newToDoObj);

    setAllTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
    setNewDescription("");
    setNewTodoTitle("");
  };

  // Load saved todos and completed todos from localStorage on component mount
  useEffect(() => {
    let savedTodos = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedToDos = JSON.parse(
      localStorage.getItem("completedTodos")
    );

    if (savedTodos) {
      setAllTodos(savedTodos);
    }

    if (savedCompletedToDos) {
      setCompletedTodos(savedCompletedToDos);
    }
  }, []);

  // Function to delete a todo
  const handleToDoDelete = (index) => {
    let reducedTodos = [...allTodos];
    reducedTodos.splice(index, 1);

    localStorage.setItem("todolist", JSON.stringify(reducedTodos));
    setAllTodos(reducedTodos);
  };

  // Function to delete a completed todo
  const handleCompletedTodoDelete = (index) => {
    let reducedCompletedTodos = [...completedTodos];
    reducedCompletedTodos.splice(index, 1);

    localStorage.setItem(
      "completedTodos",
      JSON.stringify(reducedCompletedTodos)
    );
    setCompletedTodos(reducedCompletedTodos);
  };

  // Function to mark a todo as completed
  const handleComplete = (index) => {
    // Create a new Date object to get the current date and time
    const date = new Date();
    // Extract individual components of the date and time
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    var hh = date.getHours();
    var minutes = date.getMinutes();
    var ss = date.getSeconds();
    // Format the date and time as a string
    var finalDate =
      dd + "-" + mm + "-" + yyyy + " at " + hh + ":" + minutes + ":" + ss;

    // Create a copy of the todo at the specified index with the completion date updated
    let filteredTodo = {
      ...allTodos[index],
      completedOn: finalDate,
    };

    // Create a copy of the completed todos array and add the completed todo
    let updatedCompletedList = [...completedTodos, filteredTodo];
    setCompletedTodos(updatedCompletedList);
    localStorage.setItem(
      "completedTodos",
      JSON.stringify(updatedCompletedList)
    );

    // Delete the todo from the original todos array
    handleToDoDelete(index);
  };

  // Return JSX for rendering
  return (
    <div className="App">
    {/* Application Container */}
    {/* Heading */}
    <h1>My Pending Projects</h1>
  
    {/* Todo Wrapper */}
    <div className="todo-wrapper">
      {/* Todo Input Section */}
      <div className="todo-input">
        {/* Todo Title Input */}
        <div className="todo-input-item">
          <label>Title:</label>
          {/* Input for new todo title */}
          <input
            type="text"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            placeholder="What's the title of Project/Task?"
          />
        </div>
  
        {/* Todo Description Input */}
        <div className="todo-input-item">
          <label>Description:</label>
          {/* Input for new todo description */}
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Write the description"
          />
        </div>
  
        {/* Add Todo Button */}
        <div className="todo-input-item">
          <button
            className="primary-btn"
            type="button"
            onClick={handleAddNewToDo}
          >
            Add
          </button>
        </div>
      </div>
  
      {/* Buttons to toggle between Todo and Completed screens */}
      <div className="btn-area">
        {/* Button for To Do screen */}
        <button
          className={`secondaryBtn ${
            isCompletedScreen === false && "active"
          }`}
          onClick={() => setIsCompletedScreen(false)}
        >
          To Do
        </button>
  
        {/* Button for Completed screen */}
        <button
          className={`secondaryBtn ${isCompletedScreen === true && "active"}`}
          onClick={() => setIsCompletedScreen(true)}
        >
          Completed
        </button>
      </div>
  
      {/* Todo List Section */}
      <div className="todo-list">
        {/* Render todos based on the current screen */}
        {isCompletedScreen === false &&
          allTodos.map((item, index) => (
            <div className="todo-list-item" key={index}>
              {/* Display todo details */}
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
  
              {/* Display delete and complete icons */}
              <div>
                <AiOutlineDelete
                  title="Delete?"
                  className="icon"
                  onClick={() => handleToDoDelete(index)}
                />
                <BsCheckLg
                  title="Completed?"
                  className=" check-icon"
                  onClick={() => handleComplete(index)}
                />
              </div>
            </div>
          ))}
  
        {/* Render completed todos */}
        {isCompletedScreen === true &&
          completedTodos.map((item, index) => (
            <div className="todo-list-item" key={index}>
              {/* Display completed todo details */}
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p>
                  {" "}
                  <i>Completed at: {item.completedOn}</i>
                </p>
              </div>
  
              {/* Display delete icon for completed todo */}
              <div>
                <AiOutlineDelete
                  className="icon"
                  onClick={() => handleCompletedTodoDelete(index)}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  </div>
  
  );
}

export default App;
//Completed