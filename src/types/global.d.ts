export interface SubTask {
  id: number;
  title: string;
  isCompleted: boolean;
}
export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  subTasks: SubTask[];
}
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
export interface Board {
  id: number;
  title: string;
  columns: string[];
}
