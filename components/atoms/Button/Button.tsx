import styled, { CSSProperties } from "styled-components";

interface ButtonProps extends ButtonContainerProps {
  label?: string;
  onClick?: () => void;
  style?: CSSProperties;
  icon?: React.ReactNode;
}

export function Button({
  label,
  onClick,
  style,
  icon,
  backgroundColor,
  disabled = false,
}: ButtonProps) {
  return (
    <ButtonContainer
      disabled={disabled}
      onClick={onClick}
      backgroundColor={backgroundColor}
      style={style}
    >
      {icon}
      {label}
    </ButtonContainer>
  );
}

interface ButtonContainerProps {
  disabled?: boolean;
  backgroundColor?: string;
}

const ButtonContainer = styled.button<ButtonContainerProps>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  font-weight: 600;
  background-color: ${({ theme, backgroundColor, disabled }) =>
    disabled
      ? theme.colors.backgroundColor[300]
      : backgroundColor ?? theme.colors.primary.default};
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.fontColor[500] : theme.colors.fontColor[100]};
  border-style: none;
  width: 4rem;
  height: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
  &:active {
    transform: scale(0.94);
  }
`;
