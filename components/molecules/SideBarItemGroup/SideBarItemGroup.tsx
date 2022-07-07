import React, { useState, ReactElement } from "react";
import { FiChevronDown } from "react-icons/fi";
import { animated, useTransition, useSpring } from "react-spring";
import styled from "styled-components";
import { SideBarItem, SideBarItemProps } from "../SideBarItem/SideBarItem";

interface SideBarItemGroupProps {
  id: number | string;
  prefixIcon?: JSX.Element;
  label: string;
  itemCount: number;
  children: React.ReactElement | React.ReactElement[];
}

export function SideBarItemGroup({
  id,
  prefixIcon,
  label,
  itemCount,
  children,
}: SideBarItemGroupProps) {
  const [open, setOpen] = useState(false);
  const chevronStyle = useSpring({
    transform: open ? "rotate(-180deg)" : "rotate(0deg)",
  });
  const transitions = useTransition(open, {
    from: { opacity: 0, height: 0 },
    enter: { opacity: 1, height: 53 * itemCount },
    leave: { opacity: 1, height: 0 },
  });
  return (
    <div>
      <div>
        <SideBarItem
          id={id}
          prefixIcon={prefixIcon}
          suffixIcon={
            <animated.div style={chevronStyle}>
              <FiChevronDown />
            </animated.div>
          }
          onClick={() => setOpen(!open)}
          isSideBarItemGroup={true}
        >
          {label}
        </SideBarItem>
      </div>
      {transitions((styles, item) =>
        item ? (
          <Children as={animated.div} style={styles}>
            {children}
          </Children>
        ) : null
      )}
    </div>
  );
}

const Children = styled.div`
  margin-left: 1rem;
  /* For hide behind parent */
  overflow: hidden;
`;
