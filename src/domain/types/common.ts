// src/domain/types/common.ts
export type UUID = string;
export type Timestamp = Date;
export type Email = string;
export type URL = string;

export interface Entity {
  id: UUID;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
}

export interface SortOptions<T> {
  field: keyof T;
  order: 'asc' | 'desc';
}
