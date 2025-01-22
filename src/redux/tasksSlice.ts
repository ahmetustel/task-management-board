// src/redux/tasksSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask, TaskStatus } from '../interfaces/types';

interface TasksState {
  data: ITask[];
}

const initialState: TasksState = {
  data: [
    {
      id: 'task-1',
      title: 'Kurulum Yap',
      description: 'Projenin temel kurulumu',
      status: 'open',
      assigneeId: 1,
      storyPoint: 2,
      startDate: '2025-01-10',
      endDate: '2025-01-12',
    },
    {
      id: 'task-2',
      title: 'UI Tasarımı',
      status: 'inProgress',
      assigneeId: 2,
      storyPoint: 5,
    },
    {
      id: 'task-3',
      title: 'Redux Entegrasyonu',
      status: 'inReview',
      assigneeId: 1,
    },
  ],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // Yeni bir task eklemek
    addTask: (state, action: PayloadAction<ITask>) => {
      state.data.push(action.payload);
    },
    // Task'in status'unu güncellemek
    updateTaskStatus: (
      state,
      action: PayloadAction<{ taskId: string; newStatus: TaskStatus }>
    ) => {
      const { taskId, newStatus } = action.payload;
      const taskIndex = state.data.findIndex((t) => t.id === taskId);
      if (taskIndex !== -1) {
        state.data[taskIndex].status = newStatus;
      }
    },
    // Aynı sütunda Task sıralamasını değiştirmek
    reorderTaskInSameColumn: (
      state,
      action: PayloadAction<{
        columnStatus: TaskStatus;
        oldIndex: number;
        newIndex: number;
      }>
    ) => {
      const { columnStatus, oldIndex, newIndex } = action.payload;
      const tasksInColumn = state.data
        .filter((t) => t.status === columnStatus)
        .sort((a, b) => a.id.localeCompare(b.id));
      const [movedTask] = tasksInColumn.splice(oldIndex, 1);
      tasksInColumn.splice(newIndex, 0, movedTask);

      // Önc. o sütundaki task’leri ana listeden çıkar
      state.data = state.data.filter((t) => t.status !== columnStatus);
      // Sonra güncellenmiş tasksInColumn’u geri ekle
      state.data = [...state.data, ...tasksInColumn];
    },
  },
});

export const { addTask, updateTaskStatus, reorderTaskInSameColumn } =
  tasksSlice.actions;
export const selectTasks = (state: { tasks: TasksState }) => state.tasks.data;
export default tasksSlice.reducer;
