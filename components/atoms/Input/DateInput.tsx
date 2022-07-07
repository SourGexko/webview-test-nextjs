import { format } from "date-fns";
import {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  useRef,
  useState,
} from "react";
import { DayPicker } from "react-day-picker";
import { FiCalendar } from "react-icons/fi";
import { usePopper } from "react-popper";
import styled from "styled-components";
import HStack from "../HStack/HStack";
import { useModal } from "../../../hooks/useModal";
import FocusTrap from "focus-trap-react";
import ko from "date-fns/locale/ko";

interface DateInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  title?: string;
  fromDate?: string;
  onSelectDate: (date?: string) => void;
}

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ title, width, onSelectDate, fromDate, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const [selected, setSelected] = useState<Date>();
    const { isOpen, onOpen, onClose } = useModal();

    const popperRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    const [popperElement, setPopperElement] =
      useState<HTMLDivElement | null>(null);
    const popper = usePopper(popperRef.current, popperElement, {
      placement: "bottom-start",
    });
    const handleDaySelect = (date: Date) => {
      setSelected(date);
      if (date) {
        onSelectDate(format(date, "y-MM-dd"));
        onClose();
      } else {
        onSelectDate("");
      }
    };
    return (
      <div>
        <InputContainer
          ref={popperRef}
          width={width}
          onBlur={() => setFocused(false)}
        >
          <InputTitle>{title}</InputTitle>
          <HStack style={{ position: "relative" }}>
            <InputWrapper
              ref={ref as any}
              onFocus={() => setFocused(true)}
              {...props}
            />
            <InputButton ref={buttonRef} focused={focused} onClick={onOpen}>
              <FiCalendar style={{ textAlign: "center" }} />
            </InputButton>
          </HStack>
        </InputContainer>
        {isOpen && (
          <FocusTrap
            active
            focusTrapOptions={{
              initialFocus: false,
              allowOutsideClick: true,
              clickOutsideDeactivates: true,
              onDeactivate: onClose,
            }}
          >
            <DayPickerWrapper
              id="dialog"
              tabIndex={-1}
              style={popper.styles.popper}
              {...popper.attributes.popper}
              ref={setPopperElement}
            >
              <DayPicker
                initialFocus={isOpen}
                mode="single"
                defaultMonth={selected}
                selected={selected}
                onSelect={(date) => handleDaySelect(date!)}
                fromDate={fromDate ? new Date(fromDate) : undefined}
                captionLayout="dropdown"
                locale={ko}
                modifiersClassNames={{
                  selected: "daypicker-selected",
                }}
              />
            </DayPickerWrapper>
          </FocusTrap>
        )}
      </div>
    );
  }
);

DateInput.displayName = "DateInput";

interface InputContainerProps {
  width?: string | number;
}

const DayPickerWrapper = styled.div`
  z-index: 99;
  border-radius: 1rem;
  color: ${({ theme }) => theme.colors.fontColor.default};
  background-color: ${({ theme }) => theme.colors.backgroundColor.default};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

const InputContainer = styled.div<InputContainerProps>`
  width: ${({ width }) => width ?? "100%"};
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
`;

const InputTitle = styled.div`
  margin-bottom: 0.8rem;
  height: 1rem;
  color: ${({ theme }) => theme.colors.fontColor[500]};
`;

const InputWrapper = styled.input`
  outline: none;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.colors.backgroundColor[500]};
  border-radius: 0.4rem;
  height: 2rem;
  width: 100%;
  padding: 0 0.5rem;
  transition: 0.3s;
  color: ${({ theme }) => theme.colors.fontColor.default};
  background-color: ${({ theme }) => theme.colors.backgroundColor[100]};
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.primary.default};
  }
`;

const InputButton = styled.div<{ focused: boolean }>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  width: 2rem;
  height: 2rem;
  transition: 0.3s;
  color: ${({ theme, focused }) =>
    focused ? theme.colors.primary.default : theme.colors.fontColor[500]};
  border-left: 1px solid
    ${({ theme, focused }) =>
      focused
        ? theme.colors.primary.default
        : theme.colors.backgroundColor[500]};
`;
