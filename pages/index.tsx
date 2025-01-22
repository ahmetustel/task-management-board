// pages/board/index.tsx
import React from 'react';
import { useAppDispatch, useAppSelector } from '../src/redux/store';
import {
  selectTasks,
  updateTaskStatus,
  reorderTaskInSameColumn,
} from '../src/redux/tasksSlice';
import { ITask } from '../src/interfaces/types';
import AddTaskForm from '../src/components/AddTaskForm';
import BoardUserList from '../src/components/BoardUserList';
import Column from '../src/components/Column';

import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';

const BoardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);

  // Sütunları sabit olarak tanımladık
  const columns = [
    { id: 'open', title: 'Open' },
    { id: 'inProgress', title: 'In Progress' },
    { id: 'inReview', title: 'In Review' },
    { id: 'done', title: 'Done' },
  ];

  // DnDKit sensörleri
  const pointerSensor = useSensor(PointerSensor);
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(pointerSensor, keyboardSensor);

  // Drag bittiğinde
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeTaskId = active.id.toString();
    const overColumnId = over.id.toString();

    const activeTask = tasks.find((t) => t.id === activeTaskId);
    if (!activeTask) return;

    if (activeTask.status === overColumnId) {
      // Aynı sütun içinde sıralama
      const oldIndex = getIndexInColumn(activeTask, tasks);
      const newIndex = getIndexInColumnByTaskId(
        overColumnId,
        activeTaskId,
        tasks
      );
      if (
        oldIndex !== undefined &&
        newIndex !== undefined &&
        oldIndex !== newIndex
      ) {
        dispatch(
          reorderTaskInSameColumn({
            columnStatus: overColumnId as any,
            oldIndex,
            newIndex,
          })
        );
      }
    } else {
      // Farklı sütuna taşınıyor => Status değiştir
      dispatch(
        updateTaskStatus({
          taskId: activeTaskId,
          newStatus: overColumnId as any,
        })
      );
    }
  };

  // Helper fonksiyonu: Task, kendi sütununda kaçıncı sırada?
  const getIndexInColumn = (
    task: ITask,
    allTasks: ITask[]
  ): number | undefined => {
    const tasksInColumn = allTasks
      .filter((t) => t.status === task.status)
      .sort((a, b) => a.id.localeCompare(b.id));
    return tasksInColumn.findIndex((t) => t.id === task.id);
  };

  // Helper fonksiyonu: Bırakılan sütuna ait tasks dizisinde bu Task hangi pozisyona gelecek?
  const getIndexInColumnByTaskId = (
    columnStatus: string,
    taskId: string,
    allTasks: ITask[]
  ): number | undefined => {
    const tasksInColumn = allTasks
      .filter((t) => t.status === columnStatus)
      .sort((a, b) => a.id.localeCompare(b.id));
    // Basit olarak en sona ekleyelim
    return tasksInColumn.length;
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Task Management Board</h1>

      {/* Kullanıcı Avatarlari */}
      <BoardUserList />

      {/* Task Ekleme Formu */}
      <AddTaskForm />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-4 gap-4">
          {columns.map((col) => (
            <Column key={col.id} columnId={col.id} title={col.title} />
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default BoardPage;
