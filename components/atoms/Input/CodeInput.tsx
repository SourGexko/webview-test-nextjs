import {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  useRef,
  useState,
} from "react";
import { FiCalendar, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { usePopper } from "react-popper";
import styled from "styled-components";
import HStack from "../HStack/HStack";
import { useModal } from "../../../hooks/useModal";
import FocusTrap from "focus-trap-react";
import { useQuery } from "react-query";
import { QueryKeys } from "../../../core/query-keys";
import {
  CodeBase,
  CodeDepth0,
  CodeDepth1,
  CodeDepth2,
  CodeDepth3,
  CodesService,
} from "../../../data/api";
import VStack from "../VStack/VStack";
import { CodeItem } from "../CodeItem/CodeItem";

interface CodeInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  codeDepth0: string;
  depth1Filter?: string;
  title?: string;
  onSelectCode: (code: CodeDepth3) => void;
}

export const CodeInput = forwardRef<HTMLInputElement, CodeInputProps>(
  ({ title, width, codeDepth0, depth1Filter, onSelectCode, ...props }, ref) => {
    const { data } = useQuery(QueryKeys.codes, () =>
      CodesService.getCodeDepth0({ code: codeDepth0 })
    );
    const [focused, setFocused] = useState(false);
    const [selectedDepth1, setSelectedDepth1] = useState<CodeDepth1>();
    const [selectedDepth2, setSelectedDepth2] = useState<CodeDepth2>();
    const [selectedDepth3, setSelectedDepth3] = useState<CodeDepth3>();
    const { isOpen, onOpen, onClose } = useModal();

    const popperRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
      null
    );
    const popper = usePopper(popperRef.current, popperElement, {
      placement: "bottom-start",
    });

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
              <FiChevronDown style={{ textAlign: "center" }} />
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
            <CascaderWrapper
              tabIndex={1}
              style={popper.styles.popper}
              {...popper.attributes.popper}
              ref={setPopperElement}
            >
              {data && (
                <HStack style={{ padding: "0.8rem" }}>
                  <VStack style={{ height: "10rem", overflowY: "auto" }}>
                    {data.children
                      ?.filter((value) =>
                        depth1Filter
                          ? value.code == depth1Filter
                          : value.code != undefined
                      )
                      .map((code) => (
                        <CodeInputItem
                          tabIndex={2}
                          currentSelected={selectedDepth1?.code === code.code}
                          onClick={() => setSelectedDepth1(code)}
                        >
                          {code.code} / {code.description}
                          {code.children?.length !== 0 && <FiChevronRight />}
                        </CodeInputItem>
                      ))}
                  </VStack>
                  <VStack
                    style={{
                      height: "10rem",
                      overflowY: "auto",
                    }}
                  >
                    {selectedDepth1?.children.map((code) => (
                      <CodeInputItem
                        tabIndex={3}
                        currentSelected={selectedDepth2?.code === code.code}
                        onClick={() => setSelectedDepth2(code)}
                      >
                        {code.code}
                        {code.children.length !== 0 && <FiChevronRight />}
                      </CodeInputItem>
                    ))}
                  </VStack>
                  <VStack style={{ height: "10rem", overflowY: "auto" }}>
                    {selectedDepth2?.children.map((code) => (
                      <CodeInputItem
                        tabIndex={4}
                        currentSelected={selectedDepth3?.code === code.code}
                        onClick={() => {
                          setSelectedDepth3(code);
                          onSelectCode(code);
                          onClose();
                        }}
                      >
                        {code.code}
                      </CodeInputItem>
                    ))}
                  </VStack>
                </HStack>
              )}
            </CascaderWrapper>
          </FocusTrap>
        )}
      </div>
    );
  }
);

CodeInput.displayName = "CodeInput";

interface InputContainerProps {
  width?: string | number;
}

const CascaderWrapper = styled.div`
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

const CodeInputItem = styled(CodeItem)`
  padding: 0 1rem;
  gap: 1rem;
  width: inherit;
  min-height: 2rem;
`;
