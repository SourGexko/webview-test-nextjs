import styled from "styled-components";

export const ModalFooter = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundColor[100]};
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  height: 3rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 2rem;
`;