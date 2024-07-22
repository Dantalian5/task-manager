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
