import React from "react";
import styled from "styled-components";

export interface DividerProps {
  height?: number | string;
}

export function Divider({ height }: DividerProps) {
  return <Container style={{ height }} />;
}

const Container = styled.div<DividerProps>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.backgroundColor[100]};
`;
