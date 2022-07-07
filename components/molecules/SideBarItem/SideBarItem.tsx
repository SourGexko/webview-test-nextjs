import Link from "next/link";
import { useContext, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { useTheme } from "styled-components";
import { ListItem, ListItemProps } from "../../atoms/ListItem";
import { SideBarContext } from "../SideBarContainer/SideBarContainer";

export interface SideBarItemProps extends ListItemProps {
  id: string | number;
  onClick?: () => void;
  isSideBarItemGroup?: boolean;
}

export function SideBarItem({
  id,
  prefixIcon,
  suffixIcon,
  children,
  onClick,
  isSideBarItemGroup = false,
}: SideBarItemProps) {
  const theme = useTheme();
  const { selectedId, setSelectedId } = useContext(SideBarContext);
  const [{ color, fontWeight }, setColor] = useSpring(() => ({
    color: theme.colors.fontColor[100],
    fontWeight: 300,
  }));
  useEffect(() => {
    if (selectedId == id) {
      setColor.start({ color: theme.colors.primary.default });
    } else {
      setColor.start({ color: theme.colors.fontColor[500] });
    }
  }, [selectedId, id, setColor, theme.colors.fontColor, theme.colors.primary.default]);
  const onMouseEnter = () => {
    if (id !== selectedId) {
      setColor.start({ color: theme.colors.fontColor[700] });
    }
  };
  const onMouseLeave = () => {
    if (id !== selectedId) {
      setColor.start({ color: theme.colors.fontColor[500] });
    }
  };
  const element = (
    <animated.div
      style={{ color, fontWeight }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={
        onClick
          ? onClick
          : () => {
            setSelectedId(id);
          }
      }
    >
      <ListItem prefixIcon={prefixIcon} suffixIcon={suffixIcon}>
        {children}
      </ListItem>
    </animated.div>
  );

  return isSideBarItemGroup ? element : <Link href={`/${id}`}>{element}</Link>;
}
