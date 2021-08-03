import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  toggleTodo,
  toggleHideComplete,
  selectImcompleteTodoList,
  deleteTodo
} from "./todoSlice";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

function TodoBanner() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const imcompleteTodoList = useSelector(selectImcompleteTodoList);
  const hideComplete = useSelector((state) => state.todo.hideComplete);
  const handleChangeInHc = () => {
    dispatch(toggleHideComplete());
  };
  return (
    <div className="imcomplete-banner">
      <div className="imcomplete-number">
        {imcompleteTodoList.length} {t("taskToComplete")}
      </div>
      <div className="hide-complete">
        <input
          type="checkbox"
          onChange={handleChangeInHc}
          checked={hideComplete}
        />
        {t("hideComplete")}
      </div>
    </div>
  );
}

export function TodoList() {
  const { t } = useTranslation();
  const history = useHistory();
  const handleAddTodo = () => {
    history.push("/add");
  };
  const hideComplete = useSelector((state) => state.todo.hideComplete);
  const imcompleteTodoList = useSelector(selectImcompleteTodoList);
  const allTodoList = useSelector((state) => state.todo.todoList);
  let todoList = hideComplete ? imcompleteTodoList : allTodoList;
  return (
    <>
      <TodoBanner />
      <hr />
      <div className="task-list">
        {todoList.map((item, index) => {
          return <TodoItem key={item.id} todo={item} />;
        })}
      </div>

      <button className="add-button" onClick={handleAddTodo}>
        {t("addNewTaskButton")}
      </button>
    </>
  );
}

function TodoItem(props) {
  const item = props.todo;

  const dispatch = useDispatch();
  const handleToggleComplete = (e) => {
    const id = e.target.value;
    dispatch(toggleTodo(id));
  };
  const handleDelete = () => {
    dispatch(deleteTodo(item.id));
  };
  const todayStr = format(new Date(), "yyyy-MM-dd");
  const dueDateClass =
    item.dueDate < todayStr ? " task-due-date-already" : "task-due-date";

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
      <div className="task-content">
        <div>{item.taskName}</div>
        <div className={dueDateClass}>{item.dueDate}</div>
      </div>
      <div className="task-action">
        <button onClick={handleDelete}>X</button>
      </div>
    </div>
  );
}
