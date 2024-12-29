import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    dataSelected: null,
    data: [],
  },
  reducers: {
    setTasks: (state, action) => void state.data.push(action.payload),
    setTask: (state, action) => void (state.dataSelected = action.payload),
    remove: (state) => void (state.dataSelected = null),
    addTask: (state, action) => {
      state.data.push(action.payload);
    },
    updateTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      const index = state.data.findIndex((task) => task._id === id);
      if (index !== -1) {
        state[index] = updatedTask;
      }
    },
    removeTask: (state, action) => {
      const idToRemove = action.payload;
      const arrayFiltered = state.data.filter(
        (task) => task._id !== idToRemove
      );
      state.data = arrayFiltered;
    },
  },
});

export const { setTasks, setTask, remove, addTask, updateTask, removeTask } =
  tasksSlice.actions;
export default tasksSlice.reducer;
