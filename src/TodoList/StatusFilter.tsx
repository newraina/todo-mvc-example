import { FC } from "react";
import styled from "styled-components";
import { TodoStatus } from "./interface";

export interface StatusFilterProps {
  status?: TodoStatus;

  onStatusChange(status: TodoStatus | undefined): void;
}

const StatusTag = styled.span<{ active?: boolean }>`
  display: inline-block;
  padding: 0 6px;
  font-size: 12px;
  border-radius: 12px;
  border: 1px solid transparent;
  margin-right: 4px;
  cursor: pointer;
  color: ${(p) => (p.active ? "white" : "#979797")};
  background-color: ${(p) => (p.active ? "#979797" : "")};

  &: hover {
    border-color: #979797;
  }
`;

const tags = [
  { label: "All", status: undefined },
  { label: "Active", status: "active" },
  { label: "Completed", status: "completed" },
] as const;

const StatusFilter: FC<StatusFilterProps> = (props) => {
  const { status, onStatusChange } = props;

  return (
    <div>
      {tags.map((tag) => (
        <StatusTag
          active={status === tag.status}
          onClick={() => onStatusChange(tag.status)}
        >
          {tag.label}
        </StatusTag>
      ))}
    </div>
  );
};

export default StatusFilter;
