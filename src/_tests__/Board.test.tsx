// src/__tests__/Board.test.tsx
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import BoardPage from '../../pages/board';

test('dragging a task from Open to In Progress column', () => {
  render(<BoardPage />);
  // Ekranda 'task-1' veya 'Kurulum Yap' kartını bul
  // fireEvent.dragStart(taskCard);
  // fireEvent.dragOver(inProgressColumnElement);
  // fireEvent.drop(inProgressColumnElement);
  // Sonra Redux state veya UI değişti mi kontrol edersin
});
