import { HashLoader } from "react-spinners";
import styled, { useTheme } from "styled-components";

export const CustomLoader = () => {
  const theme = useTheme();
  return (
    <LoaderWrapper>
      <HashLoader color={theme.colors.primary.default} />
    </LoaderWrapper>
  );
};

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
