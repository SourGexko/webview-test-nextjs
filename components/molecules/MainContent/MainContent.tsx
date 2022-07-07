import React from "react";
import styled from "styled-components";

interface MainContentProps {
  children: React.ReactNode;
  hasRightSection: boolean;
}

export default function MainContent({
  children,
  hasRightSection,
}: MainContentProps) {
  return (
    <ContentContainer hasRightSection={hasRightSection}>
      {children}
    </ContentContainer>
  );
}

const ContentContainer = styled.div<{ hasRightSection: boolean }>`
  display: ${({ hasRightSection }) => hasRightSection && "flex"};
  position: relative;
  margin-top: 4rem;
  width: 100%;
  height: calc(100% - 4rem);
  min-height: calc(100% - 4rem);
  overflow-y: auto;
`;
