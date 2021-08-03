import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "./todoSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

export function TodoInput() {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [taskNameToAdd, setTaskNameToAdd] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const handleAdd = () => {
    if (taskNameToAdd.trim().length === 0) {
      setErrorMessage(t("error.taskNameIsEmpty"));
      return;
    }
    //check the dueDate, must be greater than today.
    const todayStr = format(new Date(), "yyyy-MM-dd");
    const dueDateStr = format(dueDate, "yyyy-MM-dd");
    if (dueDateStr < todayStr) {
      setErrorMessage(t("error.dueDateIsDue"));
      return;
    }
    dispatch(
      addTodo({
        id: nanoid(),
        taskName: taskNameToAdd,
        dueDate: dueDateStr
      })
    );
    history.push("/");
  };
  const handleBack = () => {
    history.push("/");
  };

  return (
    <div>
      <span>{t("taskNameLabel")}</span>
      <textarea
        className="task-input"
        placeholder="Task Name Here"
        value={taskNameToAdd}
        onChange={(e) => {
          setTaskNameToAdd(e.target.value);
          setErrorMessage("");
        }}
      />
      <div>{t("dueDateLabel")}</div>
      <DatePicker
        dateFormat="yyyy-MM-dd"
        selected={dueDate}
        onChange={(date) => {
          setDueDate(date);
          setErrorMessage("");
        }}
      />
      <br />
      <p className="error-message">{errorMessage}</p>
      <br />
      <br />
      <button className="add-button" onClick={handleAdd}>
        {t("addThisTaskButton")}
      </button>
      <button className="add-button" onClick={handleBack}>
        {t("backToListButton")}
      </button>
    </div>
  );
}
