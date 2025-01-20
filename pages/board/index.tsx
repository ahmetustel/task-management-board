import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useAppSelector, useAppDispatch } from '../../src/redux/store';
import { selectTasks, updateTaskStatus } from '../../src/redux/tasksSlice';
import { Column } from '../../src/components/Column';

export default function BoardPage() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);

  // Sütunları basitçe dizi olarak tanımlıyoruz
  const columns = [
    { id: 'open', title: 'Open' },
    { id: 'inProgress', title: 'In Progress' },
    { id: 'inReview', title: 'In Review' },
    { id: 'done', title: 'Done' },
  ];

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    // Task'in status'unu güncelle
    dispatch(
      updateTaskStatus({
        taskId: draggableId,
        newStatus: destination.droppableId,
      })
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Task Management Board</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-4 gap-4">
          {columns.map((column) => (
            <Column
              key={column.id}
              title={column.title}
              status={column.id as any}
              tasks={tasks.filter((task) => task.status === column.id)}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
