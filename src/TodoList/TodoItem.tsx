import { FC, useCallback } from "react";
import { Todo } from "./interface";
import styled from "styled-components";
import { ReactComponent as CloseIcon } from "./CloseIcon.svg";

export interface TodoItemProps {
  data: Todo;

  removeTodo(id: string): void;

  markTodoActive(id: string): void;

  markTodoCompleted(id: string): void;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  padding: 2px 2px 2px 0;
  border-radius: 2px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const Title = styled.span<{ checked?: boolean }>`
  padding-left: 4px;
  text-decoration: ${(p) => (p.checked ? "line-through" : "none")};
  color: ${(p) => (p.checked ? "#bababa" : "#161717")};
`;

const Close = styled(CloseIcon)`
  font-size: 16px;
  color: #161717;
  visibility: hidden;
  cursor: pointer;

  ${Container}:hover & {
    visibility: visible;
  }
`;

const TodoItem: FC<TodoItemProps> = (props) => {
  const { data, markTodoCompleted, markTodoActive, removeTodo } = props;
  const checked = data.status === "completed";

  const onCheck = useCallback(() => {
    if (data.status === "active") {
      markTodoCompleted(data.id);
    }
    if (data.status === "completed") {
      markTodoActive(data.id);
    }
  }, [data, markTodoCompleted, markTodoActive]);

  const onDelete = useCallback(() => {
    removeTodo(data.id);
  }, [data, removeTodo]);

  return (
    <Container>
      <label>
        <input type="checkbox" checked={checked} onChange={onCheck} />
        <Title checked={checked}>{data.title}</Title>
      </label>
      <Close onClick={onDelete} />
    </Container>
  );
};

export default TodoItem;
