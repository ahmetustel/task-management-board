// src/components/AddTaskForm.tsx
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { addTask } from '../redux/tasksSlice';
import { selectUsers } from '../redux/usersSlice';
import { ITask } from '../interfaces/types';
import { v4 as uuidv4 } from 'uuid';

const AddTaskForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeId, setAssigneeId] = useState<number | undefined>(undefined);
  const [storyPoint, setStoryPoint] = useState<number | undefined>(undefined);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) return; // Title zorunlu

    const newTask: ITask = {
      id: uuidv4(),
      title,
      description,
      status: 'open',
      assigneeId,
      storyPoint,
      startDate,
      endDate,
    };
    dispatch(addTask(newTask));

    // Formu sıfırla
    setTitle('');
    setDescription('');
    setAssigneeId(undefined);
    setStoryPoint(undefined);
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="bg-white p-4 shadow rounded mb-4">
      <h2 className="text-xl font-bold mb-2">Create New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label
            htmlFor="titleInput"
            className="block text-sm font-semibold mb-1"
          >
            Title
          </label>
          <input
            id="titleInput"
            type="text"
            className="border px-2 py-1 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            required
          />
        </div>
        <div>
          <label
            htmlFor="DescriptionInput"
            className="block text-sm font-semibold mb-1"
          >
            Description
          </label>
          <textarea
            className="border px-2 py-1 w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description"
          />
        </div>
        <div>
          <label
            htmlFor="SelectUserInput"
            className="block text-sm font-semibold mb-1"
          >
            Assignee
          </label>
          <select
            className="border px-2 py-1 w-full"
            value={assigneeId || ''}
            onChange={(e) => setAssigneeId(Number(e.target.value))}
          >
            <option value="">Select user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="storyInput"
            className="block text-sm font-semibold mb-1"
          >
            Story Point
          </label>
          <input
            id="StoryInput"
            type="number"
            className="border px-2 py-1 w-full"
            value={storyPoint || ''}
            onChange={(e) => setStoryPoint(Number(e.target.value))}
            placeholder="e.g. 3"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Start Date</label>
          <input
            type="date"
            className="border px-2 py-1 w-full"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">End Date</label>
          <input
            type="date"
            className="border px-2 py-1 w-full"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;
