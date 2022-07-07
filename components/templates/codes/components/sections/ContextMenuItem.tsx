import React from "react";
import styled from "styled-components";

interface ContextMenuItemProps {
  icon?: React.ReactNode;
  label?: React.ReactNode;
  onClick?: () => void;
}

const ContextMenuItem = ({ icon, label, onClick }: ContextMenuItemProps) => {
  return (
    <ContextMenuItemContainer onClick={onClick}>
      <Icon>{icon}</Icon>
      <Label>{label}</Label>
    </ContextMenuItemContainer>
  );
};

export default ContextMenuItem;

const ContextMenuItemContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 0.8rem;
  margin: 0.8rem 1.3rem;
  width: 75%;
  padding: 0.5rem 0.5rem;
  border-radius: 0.2rem;
  &:hover {
    transition: 0.3s;
    color: whitesmoke;
    background-color: ${({ theme }) => theme.colors.secondary.default};
  }
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
`;
