// src/domain/entities/user.ts
import { Email, Entity, Timestamp } from '../types/common';

export enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
}

export interface UserEntity extends Entity {
  name: string;
  email: Email;
  role: UserRole;
  avatar?: URL;
  lastActive?: Timestamp;
}
