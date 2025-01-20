import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask, TaskStatus } from '../interfaces/types';

interface TasksState {
  data: ITask[];
}

const initialState: TasksState = {
  data: [
    {
      id: 'task-1',
      title: 'Proje kurulumu',
      description: 'Projenin temel konfigürasyonlarını yap',
      status: 'open',
    },
    {
      id: 'task-2',
      title: 'Header tasarımı',
      status: 'inProgress',
    },
    {
      id: 'task-3',
      title: 'Redux entegrasyonu',
      status: 'inReview',
    },
  ],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    updateTaskStatus: (
      state,
      action: PayloadAction<{ taskId: string; newStatus: TaskStatus }>
    ) => {
      const { taskId, newStatus } = action.payload;
      const taskIndex = state.data.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        state.data[taskIndex].status = newStatus;
      }
    },
    addTask: (state, action: PayloadAction<ITask>) => {
      state.data.push(action.payload);
    },
  },
});

export const { updateTaskStatus, addTask } = tasksSlice.actions;

// Selector
export const selectTasks = (state: { tasks: TasksState }) => state.tasks.data;

export default tasksSlice.reducer;
