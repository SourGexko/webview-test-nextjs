import styled from "styled-components";

export const CodeItem = styled.div<{
  selected?: boolean;
  currentSelected: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ selected, currentSelected, theme }) =>
    currentSelected
      ? theme.colors.primary.default
      : selected
      ? theme.colors.secondary.default
      : undefined};
  margin: 0.5rem 1rem;
  border-radius: 0.4rem;
  width: 80%;
  height: 2rem;
  color: ${({ selected, currentSelected }) =>
    selected || currentSelected ? "whitesmoke" : undefined};
  transition: 0.3s;
`;
