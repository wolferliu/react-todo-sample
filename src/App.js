import "./styles.css";

export default function App() {
  return (
    <div className="todo-app">
      <h2>Todo List</h2>
      <div className="imcomplete-banner">
        <div className="imcomplete-number">3 tasks to complete</div>
        <div className="hide-complete">
          <input type="checkbox" />
          Hide Complete
        </div>
      </div>

      <hr />

      <div className="task-list">
        <div className="task-line">
          <div className="task-checkbox">
            <input type="checkbox" />
          </div>
          <div className="task-content">Have Dinner with Dad</div>
        </div>
        <div className="task-line">
          <div className="task-checkbox">
            <input type="checkbox" />
          </div>
          <div className="task-content">Eat some fruits</div>
        </div>
        <div className="task-line">
          <div className="task-checkbox">
            <input type="checkbox" checked />
          </div>
          <div className="task-content">Drink some water</div>
        </div>
        <div className="task-line">
          <div className="task-checkbox">
            <input type="checkbox" />
          </div>
          <div className="task-content">
            Learn react and finish the todo-list app, and the challenge in FFC.
          </div>
        </div>
      </div>
      <hr />

      <div>
        <span>Task Name:</span> <textarea className="task-input" />{" "}
        <button className="add-button">Add it</button>
      </div>
    </div>
  );
}
