import styled from "styled-components";

interface AvatarProps extends ContainerProps {
  image?: React.ReactNode;
  value?: string | number;
}

export default function Avatar({
  image,
  value,
  color,
  backgroundColor,
  width,
  height,
}: AvatarProps) {
  return (
    <Container
      width={width}
      height={height}
      color={color}
      backgroundColor={backgroundColor}
    >
      {image && <ImageContainer>{image}</ImageContainer>}
      {value && value.toString().at(0)?.toUpperCase()}
    </Container>
  );
}

interface ContainerProps {
  width?: string | number;
  height?: string | number;
  color?: string;
  backgroundColor?: string;
}

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
`;

const Container = styled.button<ContainerProps>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width || "2rem"};
  height: ${({ height }) => height || "2rem"};
  border-radius: 50%;
  text-align: center;
  border: none;
  padding: 0;
  margin: 0;
  color: whitesmoke;
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor || theme.colors.primary.default};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;
