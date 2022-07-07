import React from "react";
import styled from "styled-components";
import { Position } from "../../../../../hooks/useContextMenu";

interface ContextMenuProps {
  isOpen: boolean;
  position: Position;
  children: React.ReactNode;
}

function ContextMenu({ isOpen, position, children }: ContextMenuProps) {
  return <>{isOpen && <Container position={position}>{children}</Container>}</>;
}

export default ContextMenu;

const Container = styled.div<{ position: Position }>`
  position: fixed;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.backgroundColor.default};
  border-radius: 1rem;
  top: ${({ position }) => `${position.y}px`};
  left: ${({ position }) => `${position.x}px`};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;
