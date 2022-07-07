import { createContext, Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";

interface SideBarContextProps {
  selectedId: number | string;
  setSelectedId: Dispatch<SetStateAction<number | string>>;
}

export const SideBarContext = createContext<SideBarContextProps>({
  selectedId: 0,
  setSelectedId: () => {},
});

interface SideBarContainerProps {
  initialSelectedId: number | string;
  title: string;
  logo: string;
  minWidth?: number | string;
  children: React.ReactNode;
}

export function SideBarContainer({
  initialSelectedId,
  title,
  logo,
  minWidth = "16rem",
  children,
}: SideBarContainerProps) {
  const [selectedId, setSelectedId] = useState(initialSelectedId);
  return (
    <Container minWidth={minWidth}>
      <Header>
        {/* <img className={styles.logo} src={logo} alt="logo"></img> */}
        <Title>{title}</Title>
      </Header>
      <SideBarContext.Provider value={{ selectedId, setSelectedId }}>
        <NavList>{children}</NavList>
      </SideBarContext.Provider>
    </Container>
  );
}

interface ContainerProps {
  minWidth: number | string;
}

const Container = styled.div<ContainerProps>`
  min-width: ${({ minWidth }) => minWidth};
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.backgroundColor.default};
  font-weight: 300;
  height: calc(100vh - ${({ theme }) => theme.size.titleBarHeight});
  min-height: calc(100vh - ${({ theme }) => theme.size.titleBarHeight});
`;

const Header = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 4rem;
  margin: 0 auto;
  gap: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.backgroundColor[100]};
`;

const Title = styled.span`
  color: ${({ theme }) => theme.colors.primary.default};
  font-size: 1rem;
  font-weight: 500;
`;

const NavList = styled.div`
  width: 100%;
  padding: 0 0.5rem;
  margin: 0 auto;
  overflow-y: auto;
`;
