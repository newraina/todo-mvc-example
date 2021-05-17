import create from "zustand";
import { persist } from "zustand/middleware";
import { Todo } from "./TodoList";
import { uniqId } from "./kit";

export interface Store {
  todoList: Todo[];

  addTodo(title: string): Todo;

  removeTodo(id: string): void;

  markTodoActive(id: string): void;

  markTodoCompleted(id: string): void;
}

export const useStore = create<Store>(
  persist(
    (set, get) => ({
      todoList: [],

      addTodo: (title: string) => {
        const newTodoItem: Todo = { id: uniqId(), title, status: "active" };
        set({ todoList: [...get().todoList, newTodoItem] });
        return newTodoItem;
      },
      removeTodo: (id: string) => {
        set({ todoList: get().todoList.filter((item) => item.id !== id) });
      },
      markTodoCompleted: (id: string) => {
        set({
          todoList: get().todoList.map((item) => {
            if (item.id === id) {
              return { ...item, status: "completed" };
            }
            return item;
          }),
        });
      },
      markTodoActive: (id: string) => {
        set({
          todoList: get().todoList.map((item) => {
            if (item.id === id) {
              return { ...item, status: "active" };
            }
            return item;
          }),
        });
      },
    }),
    {
      name: "todo-storage",
    }
  )
);
