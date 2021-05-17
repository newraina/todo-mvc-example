export type TodoStatus = "active" | "completed";

export interface Todo {
  id: string;
  title: string;
  status: TodoStatus;
}
