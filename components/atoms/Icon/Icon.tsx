import styled from "styled-components";

interface IconProps {
  icon?: JSX.Element;
  color?: string;
  width?: string | number;
}

export function Icon({ icon, width, color }: IconProps) {
  return (
    <Container color={color} width={width}>
      {icon}
    </Container>
  );
}

const Container = styled.div<IconProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 2;
  font-size: 1rem;
  width: ${(props) => props.width};
`;
