import React, { Dispatch, forwardRef, SetStateAction, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { FiSearch, FiSliders } from "react-icons/fi";
import { animated, easings, useSpring } from "react-spring";
import styled from "styled-components";

interface SearchBarProps extends ControllerRenderProps {
  isModalOpen: boolean;
  onModalOpen: () => void;
  onSubmit: () => void;
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ value, onChange, onSubmit, isModalOpen, onModalOpen }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimationFinished, setIsAnimationFinished] = useState(false);
    const [{ width, optionButtonWidth, opacity }, setSpring] = useSpring(
      () => ({
        width: 0,
        optionButtonWidth: 0,
        opacity: 0,
        config: {
          mass: 1,
          duration: 400,
          friction: 14,
          tension: 120,
          easing: easings.easeInOutQuad,
        },
        onStart: () => setIsAnimationFinished(false),
        onRest: () => {
          if (isOpen) setIsOpen(false);
          setIsAnimationFinished(true);
        },
      })
    );
    const onFocus = () => {
      setIsOpen(true);
      setSpring.start({
        opacity: 1,
        width: 140,
        optionButtonWidth: 36,
      });
    };
    const onBlur = () => {
      if (!isModalOpen) {
        setSpring.start({
          opacity: 0,
          width: 0,
          optionButtonWidth: 0,
        });
      }
    };
    const onKeyDown = (e: React.KeyboardEvent) => {
      if (e.code === "Enter") {
        onSubmit();
      }
    };
    return (
      <Container as={animated.div} onFocus={onFocus} onBlur={onBlur}>
        <OptionButton
          as={animated.button}
          style={{ width: optionButtonWidth, opacity: opacity }}
          onClick={onModalOpen}
        >
          <FiSliders />
        </OptionButton>
        <Input
          as={animated.input}
          type="text"
          placeholder="검색어를 입력하세요"
          style={{ width, opacity }}
          value={value || ""}
          onChange={onChange}
          ref={ref}
          onKeyDown={onKeyDown}
        />
        <SearchButton
          onClick={() => {
            isOpen && isAnimationFinished && onSubmit();
          }}
        >
          <FiSearch />
        </SearchButton>
      </Container>
    );
  }
);

SearchBar.displayName = "SearchBar";

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundColor[200]};
  height: 2rem;
  border-radius: 1rem;
`;

const OptionButton = styled.button`
  cursor: pointer;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  color: ${({ theme }) => theme.colors.secondary.default};
  font-size: 0.8rem;
  border: none;
  background: none;
  outline: none;
  padding: 0;
  margin: 0;
`;

const Input = styled.input`
  border: none;
  background: none;
  outline: none;
  float: none;
  color: ${({ theme }) => theme.colors.fontColor.default};
  line-height: 2rem;
  padding: 0;
`;

const SearchButton = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  width: 2rem;
  color: ${({ theme }) => theme.colors.primary.default};
  float: right;
  border-radius: 50%;
  border: none;
  background: inherit;
  outline: none;
  padding: 0;
`;
