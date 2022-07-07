import React from "react";
import { FiGitMerge } from "react-icons/fi";
import { useRecoilValue } from "recoil";
import { useTheme } from "styled-components";
import Chip from "../../../../atoms/Chip/Chip";
import Flex from "../../../../atoms/Flex/Flex";
import { Section } from "../../../../atoms/Section/Section";
import SectionHeader from "../../../../atoms/SectionHeader/SectionHeader";
import InfoCard from "../../../../molecules/InfoCard/InfoCard";
import StatCard from "../../../../molecules/StatCard/StatCard";
import { currentSelectedCodeState } from "../../core/states";

function InfoSection() {
  const currentSelectedCode = useRecoilValue(currentSelectedCodeState);
  const theme = useTheme();
  return (
    <Section>
      <SectionHeader
        paddingHorizontal={"1rem"}
        backgroundColor={theme.colors.backgroundColor[200]}
      >
        상세정보
        <Chip
          value={
            currentSelectedCode
              ? currentSelectedCode?.code.code
              : "코드를 선택하세요"
          }
        />
      </SectionHeader>
      <Flex style={{ alignItems: "stretch", gap: "1rem", padding: "1rem" }}>
        <InfoCard
          subject="생성일"
          value={currentSelectedCode?.code.createdAt.substring(0, 10)}
        />
        <InfoCard
          subject="수정일"
          value={currentSelectedCode?.code.updatedAt.substring(0, 10)}
        />
        <StatCard
          icon={<FiGitMerge />}
          subject="인스턴스수"
          value={currentSelectedCode?.code.instancesCount}
          description="해당 코드를 갖고있는 개체의 수"
        />
      </Flex>
    </Section>
  );
}

export default InfoSection;
