// src/components/Column.tsx
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { useAppSelector } from '../redux/store';
import { selectTasks } from '../redux/tasksSlice';
import SortableTaskCard from './SortableTaskCard';

interface ColumnProps {
  columnId: string; // open, inProgress, inReview, done
  title: string;
}

const Column: React.FC<ColumnProps> = ({ columnId, title }) => {
  const { setNodeRef } = useDroppable({ id: columnId });
  const allTasks = useAppSelector(selectTasks);

  const tasksInColumn = allTasks
    .filter((t) => t.status === columnId)
    .sort((a, b) => a.id.localeCompare(b.id));

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-100 p-2 rounded min-h-[300px] flex flex-col"
    >
      <h2 className="text-lg font-semibold mb-2">{title}</h2>

      <SortableContext
        items={tasksInColumn.map((task) => task.id)}
        strategy={rectSortingStrategy}
      >
        {tasksInColumn.map((task) => (
          <SortableTaskCard key={task.id} task={task} />
        ))}
      </SortableContext>
    </div>
  );
};

export default Column;
