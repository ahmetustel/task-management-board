// src/components/BoardUserList.tsx
import React from 'react';
import { useAppSelector } from '../redux/store';
import { selectUsers } from '../redux/usersSlice';
import UserAvatar from './UserAvatar';

const BoardUserList: React.FC = () => {
  const users = useAppSelector(selectUsers);

  return (
    <div className="flex space-x-4 mb-4 items-center">
      {users.map((user) => (
        <UserAvatar key={user.id} user={user} />
      ))}
    </div>
  );
};

export default BoardUserList;
