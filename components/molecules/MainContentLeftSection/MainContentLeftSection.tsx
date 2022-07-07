import React from "react";
import styled, { CSSProperties } from "styled-components";
import VStack from "../../atoms/VStack/VStack";

interface MainContentLeftSectionProps {
  children?: React.ReactNode;
  style?: CSSProperties;
}

export default function MainContentLeftSection({
  children,
  style
}: MainContentLeftSectionProps) {
  return <Container style={style}>{children}</Container>;
}

const Container = styled(VStack)`
  flex-grow: 2;
  padding: 0 1rem;
  height: 100%;
  min-height: 100%;
  overflow-y: auto;
`;
