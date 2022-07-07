import React from "react";
import styled, { CSSProperties } from "styled-components";

interface HStackProps {
  style?: CSSProperties;
  children: React.ReactNode;
}

export default function HStack({ children, style }: HStackProps) {
  return <Container style={style}>{children}</Container>;
}

const Container = styled.div<any>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
