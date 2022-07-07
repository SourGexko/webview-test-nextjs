import React, { useState } from "react";
import { useTransition, animated, config } from "react-spring";
import styled from "styled-components";
import ModalPortal from "../ModalPortal/ModalPortal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  width: string | number;
  height: string | number;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

function Modal({
  isOpen,
  onClose,
  width,
  height,
  title,
  children,
  footer,
}: ModalProps) {
  const [isExpired, setIsExpired] = useState(false);
  const modalTransition = useTransition(isOpen, {
    initial: { opacity: 0 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    onStart: () => {
      if (isOpen) {
        setIsExpired(false);
      }
    },
    onRest: () => {
      if (!isOpen) {
        setIsExpired(true);
      }
    },
    config: config.gentle,
  });

  return modalTransition(({ opacity }, item) =>
    item ? (
      <ModalPortal>
        {!isExpired && (
          <ModalBackground
            isOpen={isOpen}
            as={animated.div}
            onClick={onClose}
          />
        )}
        <animated.div style={{ opacity }}>
          <ModalContent width={width} height={height}>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>{footer}</ModalFooter>
          </ModalContent>
        </animated.div>
      </ModalPortal>
    ) : null
  );
}

export default Modal;

const ModalFooter = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundColor[100]};
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  height: 3.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 2rem;
`;

const ModalBody = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundColor.default};
  height: calc(100% - 7rem);
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  color: ${({ theme }) => theme.colors.fontColor.default};
  background-color: ${({ theme }) => theme.colors.backgroundColor[100]};
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBackground = styled.div<{ isOpen: boolean }>`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;
  backdrop-filter: ${({ isOpen }) =>
    isOpen ? "blur(3px) contrast(.6)" : "blur(0px) grayscale(0)"};
`;

const ModalContent = styled.div<{
  width: number | string;
  height: number | string;
}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 2rem;
  background: ${({ theme }) => theme.colors.backgroundColor[100]};
  box-shadow: 0 4px 8px 0 ${({ theme }) => theme.colors.shadow.default};
  *::-webkit-scrollbar {
    background-color: ${({ theme }) => theme.colors.backgroundColor.default};
    width: 16px;
  }
  /* background of the scrollbar except button or resizer */
  *::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.backgroundColor.default};
  }

  /* scrollbar itself */
  *::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.backgroundColor[300]};
    border-radius: 16px;
    border: 4px solid ${({ theme }) => theme.colors.backgroundColor.default};
  }

  /* set button(top and bottom of the scrollbar) */
  *::-webkit-scrollbar-button {
    display: none;
  }
`;
