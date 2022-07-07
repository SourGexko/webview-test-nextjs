import React from "react";
import styled from "styled-components";

interface MainContainerProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function MainContainer({
  children,
  onClick,
}: MainContainerProps) {
  return (
    <Container
      onClick={onClick}
      onContextMenu={(e) => {
        if (onClick) onClick();
      }}
    >
      {children}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 100%;
  overflow-y: auto;
  border-left: 1px solid ${({ theme }) => theme.colors.backgroundColor[100]};
`;
