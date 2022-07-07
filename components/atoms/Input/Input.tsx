import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from "react";
import styled from "styled-components";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  title?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ title, width, ...props }, ref) => {
    return (
      <InputContainer width={width}>
        <InputTitle>{title}</InputTitle>
        <InputWrapper ref={ref as any} {...props} />
      </InputContainer>
    );
  }
);

Input.displayName = "Input";

interface InputContainerProps {
  width?: string | number;
}

const InputContainer = styled.div<InputContainerProps>`
  width: ${({ width }) => width ?? "100%"};
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
`;

const InputTitle = styled.div`
  margin-bottom: 0.8rem;
  height: 1rem;
  color: ${({ theme }) => theme.colors.fontColor[500]};
`;

const InputWrapper = styled.input`
  outline: none;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.colors.backgroundColor[500]};
  border-radius: 0.4rem;
  height: 2rem;
  width: 100%;
  padding: 0 0.5rem;
  transition: 0.3s;
  color: ${({ theme }) => theme.colors.fontColor.default};
  background-color: ${({ theme }) => theme.colors.backgroundColor[100]};
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.primary.default};
  }
`;
