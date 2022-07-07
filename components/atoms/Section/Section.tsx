import styled from "styled-components";

export const Section = styled.div`
  flex: 1;
  border-bottom: 1px solid ${({ theme }) => theme.colors.backgroundColor[100]};
  height: 100%;
  max-height: 100%;
`;
