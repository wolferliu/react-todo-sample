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
      due_date: "",
      id: 1
    },
    {
      finished: false,
      taskName: "Eat some fruits",
      due_date: "",
      id: 2
    },
    {
      finished: true,
      taskName: "Drink some water",
      due_date: "",
      id: 3
    },
    {
      finished: false,
      taskName:
        "Learn react and finish the todo-list app, and the challenge in FFC.",
      due_date: "",
      id: 4
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
    let biggestId = taskList.reduce((accumulator, item) => {
      if (accumulator < item.id) {
        return item.id;
      }
      return accumulator;
    }, 0);
    let obj = {
      finished: false,
      taskName: taskNameToAdd,
      due_date: "",
      id: biggestId + 1
    };
    setTaskList([obj].concat(taskList));
  };
  const handleToggleComplete = (e) => {
    let itemIndex = taskList.findIndex(
      (item) => item.id.toString() === e.target.value
    );
    if (itemIndex !== -1) {
      let theItem = taskList[itemIndex];
      theItem.finished = !theItem.finished;
      let newList = taskList
        .slice(0, itemIndex)
        .concat([theItem], taskList.slice(itemIndex + 1));
      setTaskList(newList);
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
                    value={item.id}
                    onChange={handleToggleComplete}
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
