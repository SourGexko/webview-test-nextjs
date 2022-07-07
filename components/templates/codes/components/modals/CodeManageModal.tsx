import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { Button } from "../../../../atoms";
import HStack from "../../../../atoms/HStack/HStack";
import { Input } from "../../../../atoms/Input/Input_deprecated";
import Modal from "../../../../atoms/Modal/Modal";
import VStack from "../../../../atoms/VStack/VStack";
import { QueryKeys } from "../../../../../core/query-keys";
import { CodesService } from "../../../../../data/api";
import { Code, ParentCode } from "../../core/states";
import { match } from "ts-pattern";
import { useToastMutation } from "../../../../../hooks/useToastMutation";

interface CodeManageModalProps {
  mode: "create" | "update";
  isOpen: boolean;
  onClose: () => void;
  depth: number;
  updateTargetCode?: Code;
  parentCode?: ParentCode;
}

export const CodeManageModal = ({
  mode,
  isOpen,
  onClose,
  depth,
  updateTargetCode,
  parentCode,
}: CodeManageModalProps) => {
  const router = useRouter();
  // create mode\
  const masterCode =
    typeof router.query.code === "string" ? router.query.code : undefined;
  const theme = useTheme();
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");

  const { mutate: create } = useToastMutation(
    () =>
      CodesService.createCode({
        requestBody: {
          code,
          depth,
          description,
          parentCode: parentCode?.code,
        },
      }),
    {
      toastRenderer: {
        pending: "진행중...",
        error: {
          render(error) {
            return error.data.message;
          },
        },
        success: {
          render({ data }) {
            setDescription("");
            setCode("");
            return `${data?.code} 생성 완료`;
          },
        },
      },
      queryKey: QueryKeys.code(masterCode!),
      onClose,
    }
  );

  const { mutate: update } = useToastMutation(
    () =>
      CodesService.updateCode({
        requestBody: {
          originalCode: updateTargetCode ? updateTargetCode.code : "",
          depth,
          code,
          description,
        },
      }),
    {
      toastRenderer: {
        pending: "진행중...",
        error: {
          render(error) {
            return error.data.message;
          },
        },
        success: {
          render({ data }) {
            setDescription("");
            setCode("");
            return `${data?.originalCode} > ${data?.code} 수정 완료`;
          },
        },
      },
      queryKey: QueryKeys.code(masterCode!),
      onClose,
    }
  );

  useEffect(() => {
    match(mode)
      .with("create", () => {
        setCode("");
        setDescription("");
      })
      .with("update", () => {
        setCode(updateTargetCode!.code);
        setDescription(updateTargetCode!.description);
      })
      .exhaustive();
  }, [mode, updateTargetCode]);

  const modalFooter = (
    <HStack style={{ gap: "1rem" }}>
      <Button label="확인" onClick={mode == "create" ? create : update} />
      <Button
        backgroundColor={theme.colors.error.default}
        label="취소"
        onClick={onClose}
      />
    </HStack>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      width="20rem"
      height="25rem"
      title={mode == "create" ? "코드생성" : "코드수정"}
      footer={modalFooter}
    >
      <VStack style={{ padding: "1rem" }}>
        <Input
          title={mode == "create" ? "부모코드" : "기존코드"}
          disabled
          defaultValue={
            mode == "create"
              ? `${parentCode?.code} / ${parentCode?.description}`
              : updateTargetCode!.code
          }
          tabIndex={0}
        />
        <Input
          title="코드"
          tabIndex={1}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Input
          title="설명"
          tabIndex={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </VStack>
    </Modal>
  );
};
