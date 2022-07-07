import React from "react";
import styled from "styled-components";

interface TableCellProps {
  align: string;
  children?: React.ReactNode;
  primary?: string | number | React.ReactNode;
  secondary?: string | number;
  fontWeight?: number;
}
export default function TableCell({
  align,
  children,
  primary,
  secondary,
  fontWeight = 400,
}: TableCellProps) {
  return (
    <Container align={align}>
      <Children align={align}>{children}</Children>
      <Primary fontWeight={fontWeight}>{primary}</Primary>
      <Secondary>{secondary}</Secondary>
    </Container>
  );
}

const Container = styled.div<any>`
  text-align: ${({ align }) => align};
  display: flex;
  flex-direction: column;
`;

const Children = styled.div<any>`
  display: flex;
  justify-content: ${({ align }) => align};
  align-items: center;
  gap: 0.5rem;
`;

const Primary = styled.div<any>`
  font-weight: ${({ fontWeight }) => fontWeight};
`;

const Secondary = styled.div`
  font-size: 0.7rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.fontColor[500]};
`;
