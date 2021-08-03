import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todoList: [
      {
        finished: false,
        taskName: "Have Dinner with Dad",
        dueDate: "2021-08-11",
        id: "111"
      },
      {
        finished: false,
        taskName: "Eat some fruits",
        dueDate: "2021-07-31",
        id: "112"
      },
      {
        finished: true,
        taskName: "Drink some water",
        dueDate: "2021-07-21",
        id: "113"
      },
      {
        finished: false,
        taskName:
          "Learn react and finish the todo-list app, and the challenge in FFC.",
        dueDate: "2021-07-01",
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
      const { id, taskName, dueDate } = action.payload;
      state.todoList.unshift({ id, taskName, dueDate, finished: false });
    },
    toggleTodo: (state, action) => {
      const id = action.payload;
      const item = state.todoList.find((item) => item.id === id);
      item.finished = !item.finished;
    },
    deleteTodo: (state, action) => {
      const id = action.payload;
      const itemIndex = state.todoList.findIndex((item) => item.id === id);
      if (itemIndex > -1) {
        state.todoList.splice(itemIndex, 1);
      }
    }
  }
});

export const selectImcompleteTodoList = (state) => {
  return state.todo.todoList.filter((item, index) => {
    return !item.finished;
  });
};

export const {
  toggleTodo,
  addTodo,
  toggleHideComplete,
  deleteTodo
} = todoSlice.actions;
export default todoSlice.reducer;
