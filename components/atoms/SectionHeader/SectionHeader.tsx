import styled from "styled-components";

const SectionHeader = styled.div<{
  backgroundColor?: string;
  paddingHorizontal?: string | number;
  stickyHeader?: boolean;
  justifyContent?: string;
  margin?: string;
}>`
  height: 3rem;
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent || "space-between"};
  align-items: center;
  padding: 1rem ${({ paddingHorizontal }) => paddingHorizontal ?? 0};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.fontColor.default};
  position: ${({ stickyHeader }) => (stickyHeader ? "sticky" : undefined)};
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor ?? "transparent"};
  margin: ${({ margin }) => margin};
  top: 0;
`;

export default SectionHeader;
