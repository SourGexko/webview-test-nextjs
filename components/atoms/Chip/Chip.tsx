import React from "react";
import styled from "styled-components";

interface ChipProps extends ChipContainerProps {
  value?: string | number | React.ReactNode;
}

export default function Chip({ value, backgroundColor }: ChipProps) {
  return <ChipContainer backgroundColor={backgroundColor}>{value}</ChipContainer>;
}

interface ChipContainerProps {
  width?: string | number;
  height?: string | number;
  backgroundColor?: string;
}

const ChipContainer = styled.div<ChipContainerProps>`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  min-width: 1.4rem;
  min-height: 1.4rem;
  font-size: 0.7rem;
  border-radius: 1rem;
  color: white;
  padding: 0 0.5rem;
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor || theme.colors.primary.default};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;
