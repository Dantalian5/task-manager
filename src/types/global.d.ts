export interface UpdatedTask {
  id: number;
  title: string;
  description: string;
  status: string;
  subTasks: {
    id: number | null;
    title: string;
  }[];
}
export interface NewTask {
  title: string;
  description: string;
  status: string;
  boardId: number;
  subTasks: {
    id: number | null;
    title: string;
  }[];
}
export interface NewBoard {
  title: string;
  columns: string[];
}

interface NewTask {
  title: string;
  description: string;
  status: string;
  subTasks: {
    id: number | null;
    title: string;
  }[];
}

//--------------------
export interface SubTask {
  id: number;
  title: string;
  isCompleted: boolean;
}
export interface Task {
  id: number;
  title: string;
  description: string;
  columnId: number;
  subTasks: SubTask[];
}
export interface Column {
  id: number;
  name: string;
  tasks: Task[];
}
export interface Board {
  id: number;
  title: string;
  columns: Column[];
  updatedAt: Date;
  createdAt: Date;
}
export enum SortOrder {
  AlphaAsc = 'alphaAsc',
  AlphaDesc = 'alphaDesc',
  DateNewest = 'dateNewest',
  DateOldest = 'dateOldest',
  UpdatedNewest = 'updatedNewest',
  UpdatedOldest = 'updatedOldest',
}

export interface Settings {
  boardSortBy: SortOrder;
  columnSortBy: SortOrder;
  taskSortBy: SortOrder;
}
