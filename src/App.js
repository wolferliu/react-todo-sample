import "./styles.css";
import { useState } from "react";
export default function App() {
  /*
  Varibles: 
    TaskNameToAdd(string), 
    TaskList(array, inside is object:
      a checkbox,
      string,
      created_time: Date,
    ), 
    HideComplete(boolean)
  */
  const [taskNameToAdd, setTaskNameToAdd] = useState("");
  const [taskList, setTaskList] = useState([
    {
      finished: false,
      taskName: "Have Dinner with Dad",
      due_date: ""
    },
    {
      finished: false,
      taskName: "Eat some fruits",
      due_date: ""
    },
    {
      finished: true,
      taskName: "Drink some water",
      due_date: ""
    },
    {
      finished: false,
      taskName:
        "Learn react and finish the todo-list app, and the challenge in FFC.",
      due_date: ""
    }
  ]);
  const [hideComplete, setHideComplete] = useState(false);
  const handleChange = (e) => {
    setTaskNameToAdd(e.target.value);
  };
  const handleChangeInHc = () => {
    setHideComplete(!hideComplete);
  };
  const handleAdd = () => {
    let obj = {
      finished: false,
      taskName: taskNameToAdd,
      due_date: ""
    };
    setTaskList([obj].concat(taskList));
  };
  const handleComplete = (e) => {
    //todo update todo list after handleComplete
    console.log("complete " + e.target.value);
    let theItem = taskList.find((item) => item.taskName === e.target.value);
    if (theItem !== undefined) {
      theItem.finished = true;
    }
  };

  return (
    <div className="todo-app">
      <h2>Todo List</h2>
      <div className="imcomplete-banner">
        <div className="imcomplete-number">3 tasks to complete</div>
        <div className="hide-complete">
          <input
            type="checkbox"
            onChange={handleChangeInHc}
            checked={hideComplete}
          />
          Hide Complete
        </div>
      </div>

      <hr />

      <div className="task-list">
        {taskList
          .filter((item, index) => {
            return hideComplete ? !item.finished : true;
          })
          .map((item, index) => {
            return (
              <div className="task-line" key={index}>
                <div className="task-checkbox">
                  <input
                    type="checkbox"
                    value={item.taskName}
                    onChange={handleComplete}
                    checked={item.finished}
                  />
                </div>
                <div className="task-content">{item.taskName}</div>
              </div>
            );
          })}
      </div>
      <hr />

      <div>
        <span>Task Name:</span>{" "}
        <textarea
          className="task-input"
          placeholder="Task Name Here"
          value={taskNameToAdd}
          onChange={handleChange}
        />{" "}
        <button className="add-button" onClick={handleAdd}>
          Add it
        </button>
      </div>
    </div>
  );
}
