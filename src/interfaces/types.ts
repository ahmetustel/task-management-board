export interface IUser {
  id: number;
  name: string;
  avatarUrl: string;
}

export type TaskStatus = 'open' | 'inProgress' | 'inReview' | 'done';

export interface ITask {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  assigneeId?: number;
  storyPoint?: number;
  startDate?: string;
  endDate?: string;
}
