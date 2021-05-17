import { FC, useCallback, useState } from "react";
import { Todo, TodoStatus } from "./interface";
import TodoItem from "./TodoItem";
import StatusFilter from "./StatusFilter";
import styled from "styled-components";

export interface TodoListProps {
  data: Todo[];

  removeTodo(id: string): void;

  markTodoActive(id: string): void;

  markTodoCompleted(id: string): void;
}

const TodoListContent = styled.div`
  margin-top: 6px;
`;

const TodoList: FC<TodoListProps> = (props) => {
  const { data, removeTodo, markTodoActive, markTodoCompleted } = props;

  const [selectedStatus, setSelectedStatus] =
    useState<TodoStatus | undefined>(undefined);

  const onlySelectedStatus = useCallback(
    (todo: Todo) => {
      if (!selectedStatus) {
        return true;
      }
      return todo.status === selectedStatus;
    },
    [selectedStatus]
  );

  return (
    <div>
      <StatusFilter
        status={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      <TodoListContent>
        {data.filter(onlySelectedStatus).map((todo) => (
          <TodoItem
            key={todo.id}
            data={todo}
            removeTodo={removeTodo}
            markTodoActive={markTodoActive}
            markTodoCompleted={markTodoCompleted}
          />
        ))}
      </TodoListContent>
    </div>
  );
};

export default TodoList;
