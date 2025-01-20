import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { ITask, TaskStatus } from '../interfaces/types';
import TaskCard from './TaskCard';

interface ColumnProps {
  title: string;
  status: TaskStatus;
  tasks: ITask[];
}

export const Column: React.FC<ColumnProps> = ({ title, status, tasks }) => {
  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="bg-gray-100 p-2 rounded min-h-[300px]"
        >
          <h2 className="text-lg font-semibold mb-2">{title}</h2>
          {tasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
