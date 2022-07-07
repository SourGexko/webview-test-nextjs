import React from "react";
import styled from "styled-components";
import HStack from "../../atoms/HStack/HStack";

interface AppBarProps {
  title: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export function AppBar({ title, children, icon }: AppBarProps) {
  return (
    <Container>
      <HStack
        style={{
          gap: "0.5rem",
        }}
      >
        {icon}
        {title}
      </HStack>
      <HStack style={{ gap: "0.5rem" }}>{children}</HStack>
    </Container>
  );
}

const Container = styled.div`
  width: calc(100% - ${({ theme }) => theme.size.sideBarWidth});
  height: 4rem;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.fontColor[500]};
  font-weight: 300;
  background-color: ${({ theme }) => theme.colors.backgroundColor.default};
  border-bottom: 1px solid ${({ theme }) => theme.colors.backgroundColor[100]};
  position: fixed;
  overflow: hidden;
  white-space: nowrap;
`;
