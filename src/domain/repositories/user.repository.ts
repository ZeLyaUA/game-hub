// src/domain/repositories/user.repository.ts
import { UserEntity, UserRole } from '../entities/user';
import { Pagination, SortOptions } from '../types/common';

export interface UserFilters {
  role?: UserRole;
  search?: string;
  active?: boolean;
}

export interface IUserRepository {
  findAll(
    filters?: UserFilters,
    pagination?: Partial<Pagination>,
    sort?: SortOptions<UserEntity>
  ): Promise<UserEntity[]>;

  findById(id: string): Promise<UserEntity | null>;

  findByEmail(email: string): Promise<UserEntity | null>;

  create(data: Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserEntity>;

  update(id: string, data: Partial<UserEntity>): Promise<UserEntity>;

  delete(id: string): Promise<void>;

  count(filters?: UserFilters): Promise<number>;
}
