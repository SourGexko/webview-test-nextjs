import Modal from "../../../../atoms/Modal/Modal";
import { ModalMode } from "../../../../../core/types";
import HStack from "../../../../atoms/HStack/HStack";
import VStack from "../../../../atoms/VStack/VStack";
import { Input } from "../../../../atoms/Input/Input";
import { useForm } from "react-hook-form";
import { CreateStoreDto, StoresService } from "../../../../../data/api";
import { DateInput } from "../../../../atoms/Input/DateInput";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import styled, { useTheme } from "styled-components";
import { FiUpload } from "react-icons/fi";
import { Button } from "../../../../atoms";
import Image from "next/image";
import { QueryKeys } from "../../../../../core/query-keys";
import { useRecoilValue } from "recoil";
import { currentGetStoresRequestDtoState } from "../../states/currentGetStoresRequestDto.state";
import { CodeInput } from "../../../../atoms/Input/CodeInput";
import { useToastMutation } from "../../../../../hooks/useToastMutation";

interface StoreManageModalProps {
  mode: ModalMode;
  isOpen: boolean;
  onClose: () => void;
}

export const StoreManageModal = ({
  mode,
  isOpen,
  onClose,
}: StoreManageModalProps) => {
  const { register, setValue, getValues, reset } = useForm<CreateStoreDto>({
    defaultValues: {
      longitude: "123",
      latitude: "123",
    },
  });
  const [imagePreview, setImagePreview] = useState<string>();
  const onDrop = useCallback((acceptedFiles: any) => {
    setValue("logoImageFile", acceptedFiles[0]);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(acceptedFiles[0]);
    fileReader.onload = function (e) {
      setImagePreview(e.target?.result?.toString());
    };
  }, []);
  const theme = useTheme();

  const currentGetStoresRequestDto = useRecoilValue(
    currentGetStoresRequestDtoState
  );

  const { mutate: create } = useToastMutation(
    () =>
      StoresService.createStore({
        formData: getValues(),
      }),
    {
      queryKey: QueryKeys.storesQueries(currentGetStoresRequestDto),
      toastRenderer: {
        pending: "진행중...",
        error: {
          render(error) {
            return error.data.message;
          },
        },
        success: {
          render({ data }) {
            reset();
            return `${data?.name} 생성 완료`;
          },
        },
      },
      onClose,
    }
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  return (
    <Modal
      title={mode == "create" ? "가맹점생성" : "가맹점수정"}
      isOpen={isOpen}
      onClose={onClose}
      width="40rem"
      height="32rem"
      footer={
        <HStack style={{ gap: "0.5rem" }}>
          <Button label="확인" onClick={create} />
          <Button label="취소" onClick={onClose} />
        </HStack>
      }
    >
      <HStack
        style={{
          justifyContent: "space-around",
          height: "100%",
          margin: "0 1rem",
          gap: "1rem",
        }}
      >
        <VStack
          style={{
            width: "50%",
            height: "100%",
            justifyContent: "space-around",
          }}
        >
          <CodeInput
            codeDepth0="store"
            depth1Filter="category"
            title="업종코드"
            onSelectCode={(code) => setValue("codeDepth3Code", code.code)}
            {...register("codeDepth3Code")}
          />
          <Input title="가맹점명" {...register("name")} />
          <Input title="대표자명" {...register("ceoName")} />
          <DateInput
            title="설치일"
            onSelectDate={(date) =>
              setValue("installedAt", date || Date.now.toString())
            }
            {...register("installedAt")}
          />
        </VStack>
        <VStack
          style={{
            width: "50%",
            height: "100%",
            justifyContent: "space-around",
          }}
        >
          <Input title="주소" {...register("address")} />
          <Input title="상세주소" {...register("subAddress")} />
          <div>
            <ImageUploadInputTitle>로고이미지파일</ImageUploadInputTitle>
            <ImageUploadInput {...getRootProps()}>
              <ImageUploadInputBox {...getInputProps()} />
              {imagePreview ? (
                <div
                  style={{
                    width: "90%",
                    height: "90%",
                    position: "relative",
                  }}
                >
                  <Image src={imagePreview} layout="fill" />
                </div>
              ) : isDragActive ? (
                <p>이곳에 파일을 드랍하세요</p>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <FiUpload
                    fontSize="3rem"
                    color={theme.colors.primary.default}
                  />
                  <div style={{ fontSize: "0.8rem", fontWeight: 300 }}>
                    이곳에 파일을 드래그앤드롭 하거나, 클릭하세요
                  </div>
                </div>
              )}
            </ImageUploadInput>
          </div>
        </VStack>
      </HStack>
    </Modal>
  );
};

const ImageUploadInputTitle = styled.div`
  color: ${({ theme }) => theme.colors.fontColor[500]};
  margin-bottom: 0.5rem;
`;

const ImageUploadInput = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundColor[100]};
  color: ${({ theme }) => theme.colors.fontColor[500]};
  height: 10rem;
  border-radius: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.backgroundColor[500]};
`;

const ImageUploadInputBox = styled.input``;
