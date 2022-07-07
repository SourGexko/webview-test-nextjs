import { UseFormReturn } from "react-hook-form";
import { FiCheck, FiMoreHorizontal, FiX } from "react-icons/fi";
import { useSetRecoilState } from "recoil";
import { useTheme } from "styled-components";
import { GetStoresRequestDto } from "../../../../../data/api";
import { Button } from "../../../../atoms";
import HStack from "../../../../atoms/HStack/HStack";
import { DateInput } from "../../../../atoms/Input/DateInput";
import { Input } from "../../../../atoms/Input/Input";
import Modal from "../../../../atoms/Modal/Modal";
import VStack from "../../../../atoms/VStack/VStack";
import { currentGetStoresRequestDtoState } from "../../states/currentGetStoresRequestDto.state";

interface GetStoresRequestDtoModalProps {
  formState: UseFormReturn<GetStoresRequestDto, any>;
  isOpen: boolean;
  onClose: () => void;
}
export const GetStoresRequestDtoModal = ({
  formState: { register, setValue, watch, getValues },
  isOpen,
  onClose,
}: GetStoresRequestDtoModalProps) => {
  const theme = useTheme();
  const setCurrentGetStoresRequestDto = useSetRecoilState(
    currentGetStoresRequestDtoState
  );

  const onSaveCurrentQueries = () => {
    const queries = getValues();
    setCurrentGetStoresRequestDto(queries);
    onClose();
  };
  const dateSeparator = (
    <FiMoreHorizontal
      style={{ marginTop: "1.5rem", color: theme.colors.fontColor[600] }}
      fontSize="2rem"
    />
  );

  return (
    <Modal
      width="20rem"
      height="32rem"
      isOpen={isOpen}
      onClose={onClose}
      title="검색조건"
      footer={
        <HStack style={{ gap: "1rem" }}>
          <Button
            icon={<FiCheck />}
            label="확인"
            onClick={onSaveCurrentQueries}
          />
          <Button
            icon={<FiX />}
            label="취소"
            onClick={onClose}
            backgroundColor={theme.colors.error.default}
          />
        </HStack>
      }
    >
      <VStack
        style={{
          padding: "0 1rem",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Input title="가맹점명" {...register("name")} />
        <Input title="업종코드" {...register("storeCodeCode")} />
        <HStack style={{ gap: "0.5rem" }}>
          <DateInput
            title="생성일"
            onSelectDate={(date) => setValue("createdAtFrom", date)}
            {...register("createdAtFrom")}
          />
          {dateSeparator}
          <DateInput
            onSelectDate={(date) => setValue("createdAtTo", date)}
            fromDate={watch("createdAtFrom")}
            {...register("createdAtTo")}
          />
        </HStack>
        <HStack style={{ gap: "0.5rem" }}>
          <DateInput
            title="설치일"
            onSelectDate={(date) => setValue("installedAtFrom", date)}
            {...register("installedAtFrom")}
          />
          {dateSeparator}
          <DateInput
            onSelectDate={(date) => setValue("installedAtTo", date)}
            fromDate={watch("installedAtFrom")}
            {...register("installedAtTo")}
          />
        </HStack>
        <HStack style={{ gap: "0.5rem" }}>
          <DateInput
            title="수정일"
            onSelectDate={(date) => setValue("updatedAtFrom", date)}
            {...register("updatedAtFrom")}
          />
          {dateSeparator}
          <DateInput
            onSelectDate={(date) => setValue("updatedAtTo", date)}
            fromDate={watch("updatedAtFrom")}
            {...register("updatedAtTo")}
          />
        </HStack>
      </VStack>
    </Modal>
  );
};
