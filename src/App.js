import React, { useState } from "react";
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';
import "./App.css";

function App() {
  const [isCompletedScreen, setIsCompletedScreen] = useState(false);
  return (
    <div className="App">
      <h1>My To-Do Project List</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input type="text" placeholder="Task Title?"></input>
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input type="text" placeholder="Write Task Description"></input>
          </div>
          <div className="todo-input-item">
            <button type="button" className="primary-btn">
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompletedScreen === false && 'active'}`}
            onClick={() => setIsCompletedScreen (false)}
          >
            To Do
          </button>
          <button
            className={`secondaryBtn ${isCompletedScreen === true && 'active'}`}
            onClick={() => setIsCompletedScreen (true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">
        <div className="todo-list-item">
          <h3>Task 1</h3>
          <p>Description</p>
          </div>
        </div>
        <div>
          <AiOutlineDelete className="icon"/>
          <BsCheckLg className="check-icon"/>
        </div>
      </div>
    </div>
  );
}

export default App;
