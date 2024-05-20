// src/store/taskSlice.js

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import taskService from '../../services/taskService';

export const fetchTasks = createAsyncThunk(
  'tasks,/fetchTasks',
  async (params = {}, thunkApi) => {
    const {page} = params;
    const response = await taskService.getTasks();
    return response;
  },
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async taskData => {
    const response = await taskService.createTask(taskData);
    return response;
  },
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({id, taskData}) => {
    const response = await taskService.updateTask(id, taskData);
    return response;
  },
);

export const deleteTask = createAsyncThunk('tasks/deleteTask', async id => {
  await taskService.deleteTask(id);
  return id;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
        // state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state = action.payload;
        return action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        console.log('>>>>>> fetchTasks rejected', {
          action: action.error,
          state,
        });
        // state.status = 'failed';
        // state.error = action.error.message;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          task => task.id === action.payload.id,
        );
        state.tasks[index] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      });
  },
});

export const taskReducer = taskSlice.reducer;
export const taskActions = {
  ...taskSlice.actions,
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
};
