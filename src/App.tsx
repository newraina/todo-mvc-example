import React, {
  ChangeEventHandler,
  KeyboardEventHandler,
  useCallback,
  useState,
} from "react";
import { useStore } from "./store";
import TodoList from "./TodoList";
import styled from "styled-components";

const AppContainer = styled.div`
  padding: 24px;
  width: 320px;
`;

const AppTitle = styled.h1`
  font-size: 18px;
  color: rgba(0, 0, 0, 0.9);
`;

const Input = styled.input`
  margin-bottom: 12px;
  padding: 6px;
  width: 100%;
  appearance: none;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 2px;
  outline-width: 1px;
  outline-color: rgba(0, 0, 0, 0.7);
`;

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const store = useStore();

  const onInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (ev) => {
      setInputValue(ev.target.value);
    },
    [setInputValue]
  );
  const onInputEnter: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (ev) => {
      if (ev.key === "Enter") {
        const todoTitle = inputValue.trim();
        if (todoTitle) {
          store.addTodo(todoTitle);
          setInputValue("");
        }
      }
    },
    [inputValue, setInputValue, store]
  );

  return (
    <AppContainer>
      <AppTitle>Things Todo</AppTitle>

      <main>
        <Input
          autoFocus
          type="text"
          placeholder="write something to be done..."
          value={inputValue}
          onInput={onInputChange}
          onKeyDown={onInputEnter}
        />
        <TodoList
          data={store.todoList}
          removeTodo={store.removeTodo}
          markTodoActive={store.markTodoActive}
          markTodoCompleted={store.markTodoCompleted}
        />
      </main>
    </AppContainer>
  );
}

export default App;
