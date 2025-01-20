import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ITask } from '../interfaces/types';

interface TaskCardProps {
  task: ITask;
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-2 m-1 rounded shadow"
        >
          <h4 className="font-bold">{task.title}</h4>
          {task.description && (
            <p className="text-sm text-gray-600">{task.description}</p>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
