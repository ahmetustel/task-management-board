// src/components/TaskCard.tsx
import React from 'react';
import { ITask } from '../interfaces/types';

interface TaskCardProps {
  task: ITask;
  isDragging?: boolean;
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index, isDragging }) => {
  return (
    <div
      className={`
        bg-white p-2 m-1 rounded shadow
        cursor-move transition transform duration-150
        hover:scale-105
        ${isDragging ? 'border-2 border-blue-500' : ''}
      `}
    >
      <h4 className="font-bold">{task.title}</h4>
      {task.description && (
        <p className="text-sm text-gray-600">{task.description}</p>
      )}
      {/* Opsiyonel diğer bilgiler */}
      {task.storyPoint && (
        <p className="text-xs text-gray-500">Story Point: {task.storyPoint}</p>
      )}
      {task.startDate && <p className="text-xs">Start: {task.startDate}</p>}
      {task.endDate && <p className="text-xs">End: {task.endDate}</p>}
    </div>
  );
};

export default TaskCard;
