import styled from "styled-components";

interface ActiveProps {
  isActive: boolean;
  activeText?: string;
  inactiveText?: string;
}

export default function Active({
  isActive,
  activeText,
  inactiveText,
}: ActiveProps) {
  return (
    <Container>
      <Led isActive={isActive} />
      <Text>{isActive ? activeText : inactiveText}</Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const Led = styled.div<any>`
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background-color: ${({ isActive }) => (isActive ? "#55ce63" : "#F52D51")};
`;

const Text = styled.div`
  font-size: 0.8rem;
  font-weight: 200;
  color: ${({ theme }) => theme.colors.fontColor[600]};
`;
