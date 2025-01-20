// src/__tests__/TaskCard.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskCard from '../components/TaskCard';
import { ITask } from '../interfaces/types';

describe('TaskCard', () => {
  it('renders task title and description', () => {
    const mockTask: ITask = {
      id: 'task-1',
      title: 'Test Task',
      description: 'Task description',
      status: 'open',
    };

    render(<TaskCard task={mockTask} index={0} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Task description')).toBeInTheDocument();
  });
});
