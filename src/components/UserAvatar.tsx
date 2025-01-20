import React from 'react';
import { IUser } from '../interfaces/types';

interface UserAvatarProps {
  user: IUser;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  return (
    <div className="flex items-center space-x-2">
      <img
        src={user.avatarUrl}
        alt={user.name}
        className="w-8 h-8 object-cover rounded-full"
      />
      <span className="text-sm font-medium">{user.name}</span>
    </div>
  );
};
