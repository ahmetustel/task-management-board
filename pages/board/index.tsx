import React from 'react';
import { useAppDispatch, useAppSelector } from '../../src/redux/store';
import {
  selectTasks,
  updateTaskStatus,
  reorderTaskInSameColumn,
} from '../../src/redux/tasksSlice';
import { ITask, TaskStatus } from '../../src/interfaces/types';
import AddTaskForm from '../../src/components/AddTaskForm';
import BoardUserList from '../../src/components/BoardUserList';
import Column from '../../src/components/Column';

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

  const columns: { id: TaskStatus; title: string }[] = [
    { id: 'open', title: 'Open' },
    { id: 'inProgress', title: 'In Progress' },
    { id: 'inReview', title: 'In Review' },
    { id: 'done', title: 'Done' },
  ];

  const pointerSensor = useSensor(PointerSensor);
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(pointerSensor, keyboardSensor);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeTaskId = String(active.id);
    const overColumnId = String(over.id); // 'open','inProgress','inReview','done' ?

    // Type guard: is this a valid TaskStatus?
    if (
      overColumnId !== 'open' &&
      overColumnId !== 'inProgress' &&
      overColumnId !== 'inReview' &&
      overColumnId !== 'done'
    ) {
      return; // geçerli değilse dur
    }

    const activeTask = tasks.find((t) => t.id === activeTaskId);
    if (!activeTask) return;

    if (activeTask.status === overColumnId) {
      // Aynı sütuna bırakıldı => reorder
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
            columnStatus: overColumnId,
            oldIndex,
            newIndex,
          })
        );
      }
    } else {
      // Farklı sütuna taşındı => update status
      dispatch(
        updateTaskStatus({
          taskId: activeTaskId,
          newStatus: overColumnId,
        })
      );
    }
  };

  const getIndexInColumn = (
    task: ITask,
    allTasks: ITask[]
  ): number | undefined => {
    const tasksInColumn = allTasks
      .filter((t) => t.status === task.status)
      .sort((a, b) => a.id.localeCompare(b.id));
    return tasksInColumn.findIndex((t) => t.id === task.id);
  };

  const getIndexInColumnByTaskId = (
    columnStatus: TaskStatus,
    taskId: string,
    allTasks: ITask[]
  ): number | undefined => {
    const tasksInColumn = allTasks
      .filter((t) => t.status === columnStatus)
      .sort((a, b) => a.id.localeCompare(b.id));
    return tasksInColumn.length; // basit yaklaşım: en sona koy
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Task Management Board</h1>

      <BoardUserList />
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
