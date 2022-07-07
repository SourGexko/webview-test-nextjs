import React from "react";
import styled, { CSSProperties } from "styled-components";

interface VStackProps extends CSSProperties {
  children: React.ReactNode;
  style?: CSSProperties;
  className?: string;
}

export default function VStack({ children, style, className }: VStackProps) {
  return (
    <Container className={className} style={style}>
      {children}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
