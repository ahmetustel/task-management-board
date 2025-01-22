// src/components/UserAvatar.tsx
import React from 'react';
import Image from 'next/image';
import { IUser } from '../interfaces/types';

interface UserAvatarProps {
  user: IUser;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  return (
    <div className="flex items-center space-x-2">
      <Image
        src={user.avatarUrl}
        alt={user.name}
        width={32}
        height={32}
        className="rounded-full"
      />
      <span className="text-sm font-medium">{user.name}</span>
    </div>
  );
};

export default UserAvatar;
