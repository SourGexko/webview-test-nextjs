import { MouseEventHandler } from "react";
import styled from "styled-components";
import { Icon } from "../../atoms";

interface ActionButtonProps {
  icon: JSX.Element;
  color?: string;
  hoverColor?: string;
  onClick?: MouseEventHandler<any>;
}

export function ActionButton({
  icon,
  color,
  hoverColor,
  onClick,
}: ActionButtonProps) {
  return (
    <Container color={color} hoverColor={hoverColor} onClick={onClick}>
      <Icon color={color} icon={icon} width="2rem" />
    </Container>
  );
}

interface ContainerProps {
  color?: string;
  hoverColor?: string;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  height: ${({ theme }) => theme.size.titleBarHeight};
  transition: all 0.2s ease-in-out;
  color: ${({ theme }) => theme.colors.fontColor.default};
  &:hover {
    color: ${({ theme }) => theme.colors.backgroundColor.default};
    background-color: ${({ hoverColor, theme }) =>
      hoverColor || theme.colors.primary.default};
  }
  -webkit-app-region: no-drag;
`;
