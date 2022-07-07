import React from "react";
import styled, { CSSProperties } from "styled-components";

export interface CardProps extends CardContainerProps {
  children?: React.ReactNode;
  style?: CSSProperties;
}

export default function Card({
  children,
  minWidth,
  minHeight,
  style,
}: CardProps) {
  return (
    <Container minWidth={minWidth} minHeight={minHeight} style={style}>
      {children}
    </Container>
  );
}
interface CardContainerProps {
  minWidth?: string | number;
  minHeight?: string | number;
  flexDirection?: string;
}

const Container = styled.div<CardContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  flex: 1;
  min-width: ${({ minWidth }) => minWidth || "15rem"};
  min-height: ${({ minHeight }) => minHeight || "10rem"};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.backgroundColor[200]};
  overflow: hidden;
  box-shadow: 0 4px 8px 0 ${({ theme }) => theme.colors.shadow.default};
  transition: 0.3s;
  &:hover {
    box-shadow: 0 8px 16px 0 ${({ theme }) => theme.colors.shadow[500]};
  }
`;
