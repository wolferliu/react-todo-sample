import "./styles.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  toggleTodo,
  toggleHideComplete,
  selectImcompleteTodoList
} from "./reducers/todoSlice";
import { nanoid } from "@reduxjs/toolkit";

export default function App() {
  return (
    <div className="todo-app">
      <h2>Todo List</h2>
      <TodoBanner />
      <hr />

      <TodoList />
      <hr />

      <TodoInput />
    </div>
  );
}

function TodoBanner() {
  const dispatch = useDispatch();
  const imcompleteTodoList = useSelector(selectImcompleteTodoList);
  const hideComplete = useSelector((state) => state.todo.hideComplete);
  const handleChangeInHc = () => {
    dispatch(toggleHideComplete());
  };
  return (
    <div className="imcomplete-banner">
      <div className="imcomplete-number">
        {imcompleteTodoList.length} tasks to complete
      </div>
      <div className="hide-complete">
        <input
          type="checkbox"
          onChange={handleChangeInHc}
          checked={hideComplete}
        />
        Hide Complete
      </div>
    </div>
  );
}

function TodoList() {
  const hideComplete = useSelector((state) => state.todo.hideComplete);
  const imcompleteTodoList = useSelector(selectImcompleteTodoList);
  const allTodoList = useSelector((state) => state.todo.todoList);
  let todoList = hideComplete ? imcompleteTodoList : allTodoList;
  return (
    <div className="task-list">
      {todoList.map((item, index) => {
        return <TodoItem todo={item} />;
      })}
    </div>
  );
}

function TodoItem(props) {
  const item = props.todo;

  const dispatch = useDispatch();
  const handleToggleComplete = (e) => {
    const id = e.target.value;
    dispatch(toggleTodo(id));
  };
  return (
    <div className="task-line" key={item.id}>
      <div className="task-checkbox">
        <input
          type="checkbox"
          value={item.id}
          onChange={handleToggleComplete}
          checked={item.finished}
        />
      </div>
      <div className="task-content">{item.taskName}</div>
    </div>
  );
}

function TodoInput() {
  const dispatch = useDispatch();
  const [taskNameToAdd, setTaskNameToAdd] = useState("");
  const handleAdd = () => {
    dispatch(addTodo({ id: nanoid(), taskName: taskNameToAdd }));
  };

  return (
    <div>
      <span>Task Name:</span>
      <textarea
        className="task-input"
        placeholder="Task Name Here"
        value={taskNameToAdd}
        onChange={(e) => {
          setTaskNameToAdd(e.target.value);
        }}
      />
      <button className="add-button" onClick={handleAdd}>
        Add it
      </button>
    </div>
  );
}
