import { FC } from "react";
import styled from "styled-components";

export interface TodoCountProps {
  count: number;
}

const Container = styled.span`
  font-size: 12px;
  color: #979797;
`;

const CountLabel = styled.span`
  padding: 0 2px;
`;

const TodoCount: FC<TodoCountProps> = (props) => {
  const { count } = props;
  const humanReadableLabel = count > 99 ? "99+" : count;

  return (
    <Container>
      <CountLabel>{humanReadableLabel}</CountLabel>
      items left
    </Container>
  );
};

export default TodoCount;
