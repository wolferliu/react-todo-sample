import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todoList: [
      {
        finished: false,
        taskName: "Have Dinner with Dad",
        due_date: "",
        id: "111"
      },
      {
        finished: false,
        taskName: "Eat some fruits",
        due_date: "",
        id: "112"
      },
      {
        finished: true,
        taskName: "Drink some water",
        due_date: "",
        id: "113"
      },
      {
        finished: false,
        taskName:
          "Learn react and finish the todo-list app, and the challenge in FFC.",
        due_date: "",
        id: "114"
      }
    ],
    hideComplete: false
  },
  reducers: {
    toggleHideComplete: (state) => {
      state.hideComplete = !state.hideComplete;
    },
    addTodo: (state, action) => {
      const { id, taskName } = action.payload;
      state.todoList.unshift({ id, taskName, finished: false });
    },
    toggleTodo: (state, action) => {
      const id = action.payload;
      const item = state.todoList.find((item) => item.id === id);
      item.finished = !item.finished;
    }
  }
});

export const selectImcompleteTodoList = (state) => {
  return state.todo.todoList.filter((item, index) => {
    return !item.finished;
  });
};

export const { toggleTodo, addTodo, toggleHideComplete } = todoSlice.actions;
export default todoSlice.reducer;
