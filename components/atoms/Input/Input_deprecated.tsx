import { ChangeEventHandler } from "react";
import styled, { CSSProperties } from "styled-components";

interface InputProps extends InputContainerProps {
  title: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  defaultValue?: string;
  tabIndex?: number;
  width?: string | number;
  disabled?: boolean;
}

export const Input = ({
  title,
  onChange,
  value,
  defaultValue,
  tabIndex,
  width,
  disabled,
}: InputProps) => {
  return (
    <InputContainer>
      <InputTitle>{title}</InputTitle>
      <InputWrapper
        onChange={onChange}
        width={width}
        tabIndex={tabIndex}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
      />
    </InputContainer>
  );
};

interface InputContainerProps {
  width?: string | number;
}

const InputContainer = styled.div<InputContainerProps>`
  width: ${({ width }) => width ?? "100%"};
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
`;

const InputTitle = styled.span`
  margin-bottom: 0.5rem;
`;

const InputWrapper = styled.input`
  box-sizing: border-box;
  border: 1px solid #333;
  border-radius: 0.25rem;
  height: 2rem;
  width: inherit;
`;
