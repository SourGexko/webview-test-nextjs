import React from "react";
import styled, { CSSProperties } from "styled-components";

interface FlexProps {
  children: React.ReactNode;
  style?: CSSProperties;
}

export default function Flex({ children, style }: FlexProps) {
  return <Container style={style}>{children}</Container>;
}

const Container = styled.div`
  flex-wrap: wrap;
  justify-content: space-around;
  display: flex;
`;
