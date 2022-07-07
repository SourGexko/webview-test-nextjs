import React from "react";
import styled, { useTheme } from "styled-components";
import VStack from "../../atoms/VStack/VStack";

interface MainContentRightSectionProps {
  children?: React.ReactNode;
}

export default function MainContentRightSection({
  children,
}: MainContentRightSectionProps) {
  return <Container>{children}</Container>;
}

const Container = styled(VStack)`
  flex-grow: 1;
  padding: 0 1rem;
  border-left: 1px solid ${({ theme }) => theme.colors.backgroundColor[200]};
  min-width: 20rem;
  height: 100%;
  min-height: 100%;
  overflow-y: auto;
`;
