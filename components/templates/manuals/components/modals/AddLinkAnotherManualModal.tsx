import { Editor } from "@toast-ui/react-editor";
import { RefObject, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import styled, { useTheme } from "styled-components";
import { match } from "ts-pattern";
import { CLIENT_BASE_URL } from "../../../../../core/constants";
import { QueryKeys } from "../../../../../core/query-keys";
import {
  CodeDepth0,
  CodeDepth1,
  CodeDepth2,
  CodeDepth3,
  CodesService,
  Manual,
} from "../../../../../data/api";
import { Button } from "../../../../atoms";
import { CodeItem } from "../../../../atoms/CodeItem/CodeItem";
import HStack from "../../../../atoms/HStack/HStack";
import { CustomLoader } from "../../../../atoms/Loader/Loader";
import Modal from "../../../../atoms/Modal/Modal";
import { Section } from "../../../../atoms/Section/Section";
import SectionBody from "../../../../atoms/SectionBody/SectionBody";
import SectionHeader from "../../../../atoms/SectionHeader/SectionHeader";
import { Error } from "../../../../molecules/Error/Error";

interface AddLinkAnotherManualModalProps {
  isOpen: boolean;
  onClose: () => void;
  editorRef: RefObject<Editor>;
}

export const AddLinkAnotherManualModal = ({
  isOpen,
  onClose,
  editorRef,
}: AddLinkAnotherManualModalProps) => {
  const theme = useTheme();
  const { data, status } = useQuery(
    QueryKeys.codes,
    () => CodesService.getAllCodes(),
    {
      enabled: isOpen,
    }
  );
  const [selectedCodeDepth0, setSelectedCodeDepth0] = useState<CodeDepth0>();
  const [selectedCodeDepth1, setSelectedCodeDepth1] = useState<CodeDepth1>();
  const [selectedCodeDepth2, setSelectedCodeDepth2] = useState<CodeDepth2>();
  const [currentSelectedCode, setCurrentSelectedCode] = useState<
    CodeDepth0 | CodeDepth1 | CodeDepth2 | CodeDepth3
  >();
  const [selectedManual, setSelectedManual] = useState<Manual>();

  const onClickSubmit = () => {
    if (!selectedManual) {
      toast.error("선택된 메뉴얼이 없습니다");
      return;
    }
    if (!editorRef.current) {
      toast.error("editor가 load되지 않았습니다");
      return;
    }
    editorRef.current
      .getInstance()
      .insertText(
        `[${selectedManual.subject}](${CLIENT_BASE_URL}/manuals/read/${selectedManual.id})`
      );
    onClose();
  };

  const modalBody = (
    <>
      <HStack style={{ width: "100%", height: "50%", overflowY: "hidden" }}>
        <Section style={{ width: "25%", height: "100%", overflowY: "auto" }}>
          <SectionHeader
            justifyContent="center"
            backgroundColor={theme.colors.backgroundColor[200]}
          >
            분류1
          </SectionHeader>
          <SectionBody style={{ justifyContent: "center" }}>
            {data?.map((code) => (
              <CodeItem
                currentSelected={currentSelectedCode?.code === code.code}
                selected={selectedCodeDepth0?.code === code.code}
                onClick={() => {
                  setSelectedCodeDepth0(code);
                  setCurrentSelectedCode(code);
                  setSelectedCodeDepth1(undefined);
                  setSelectedCodeDepth2(undefined);
                  setSelectedManual(undefined);
                }}
              >
                {code.description}
              </CodeItem>
            ))}
          </SectionBody>
        </Section>
        <Section style={{ width: "25%", height: "100%", overflowY: "auto" }}>
          <SectionHeader
            justifyContent="center"
            backgroundColor={theme.colors.backgroundColor[200]}
          >
            분류2
          </SectionHeader>
          <SectionBody>
            {selectedCodeDepth0?.children.map((code) => (
              <CodeItem
                currentSelected={currentSelectedCode?.code === code.code}
                selected={selectedCodeDepth1?.code === code.code}
                onClick={() => {
                  setSelectedCodeDepth1(code);
                  setCurrentSelectedCode(code);
                  setSelectedCodeDepth2(undefined);
                  setSelectedManual(undefined);
                }}
              >
                {code.description}
              </CodeItem>
            ))}
          </SectionBody>
        </Section>
        <Section style={{ width: "25%", height: "100%", overflowY: "auto" }}>
          <SectionHeader
            justifyContent="center"
            backgroundColor={theme.colors.backgroundColor[200]}
          >
            분류3
          </SectionHeader>
          <SectionBody>
            {selectedCodeDepth1?.children.map((code) => (
              <CodeItem
                currentSelected={currentSelectedCode?.code === code.code}
                selected={selectedCodeDepth2?.code === code.code}
                onClick={() => {
                  setSelectedCodeDepth2(code);
                  setCurrentSelectedCode(code);
                  setSelectedManual(undefined);
                }}
              >
                {code.description}
              </CodeItem>
            ))}
          </SectionBody>
        </Section>
        <Section style={{ width: "25%", height: "100%", overflowY: "auto" }}>
          <SectionHeader
            justifyContent="center"
            backgroundColor={theme.colors.backgroundColor[200]}
          >
            분류4
          </SectionHeader>
          <SectionBody>
            {selectedCodeDepth2?.children.map((code) => (
              <CodeItem
                currentSelected={currentSelectedCode?.code === code.code}
                onClick={() => {
                  setCurrentSelectedCode(code);
                  setSelectedManual(undefined);
                }}
              >
                {code.description}
              </CodeItem>
            ))}
          </SectionBody>
        </Section>
      </HStack>
      <Section style={{ height: "50%", width: "100%" }}>
        <SectionHeader
          justifyContent="center"
          backgroundColor={theme.colors.backgroundColor[200]}
        >
          메뉴얼
        </SectionHeader>
        <SectionBody style={{ width: "100%" }}>
          {currentSelectedCode?.manuals.map((manual) => (
            <ManualItem
              selected={selectedManual?.id === manual.id}
              onClick={() => setSelectedManual(manual)}
            >
              {manual.subject}
            </ManualItem>
          ))}
        </SectionBody>
      </Section>
    </>
  );
  return (
    <Modal
      title="다른 메뉴얼 링크 추가"
      width="45rem"
      height="32rem"
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <HStack style={{ gap: "1rem" }}>
          <Button label="확인" onClick={onClickSubmit} />
          <Button label="취소" onClick={onClose} />
        </HStack>
      }
    >
      {match(status)
        .with("success", () => modalBody)
        .with("loading", () => <CustomLoader />)
        .otherwise(() => (
          <Error>can't get codes</Error>
        ))}
    </Modal>
  );
};

const ManualItem = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.primary.default : undefined};
  margin: 0.5rem 1rem;
  border-radius: 0.4rem;
  width: calc(100% - 2rem);
  height: 2rem;
  color: ${({ selected }) => (selected ? "whitesmoke" : undefined)};
  transition: 0.3s;
`;
