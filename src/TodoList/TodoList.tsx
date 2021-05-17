import { FC } from "react";
import { Todo } from "./interface";
import TodoItem from "./TodoItem";

export interface TodoListProps {
  data: Todo[];

  removeTodo(id: string): void;

  markTodoActive(id: string): void;

  markTodoCompleted(id: string): void;
}

const TodoList: FC<TodoListProps> = (props) => {
  const { data, removeTodo, markTodoActive, markTodoCompleted } = props;

  return (
    <div>
      {data.map((todoItem) => (
        <TodoItem
          key={todoItem.id}
          data={todoItem}
          removeTodo={removeTodo}
          markTodoActive={markTodoActive}
          markTodoCompleted={markTodoCompleted}
        />
      ))}
    </div>
  );
};

export default TodoList;
