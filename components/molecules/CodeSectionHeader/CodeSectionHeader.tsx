import { FiPlus } from "react-icons/fi";
import styled, { useTheme } from "styled-components";
import { Button } from "../../atoms";
import SectionHeader from "../../atoms/SectionHeader/SectionHeader";

interface CodeSectionHeaderProps {
  subject?: string;
  subtitle?: string;
  onClickButton?: () => void;
  isDivider?: boolean;
  disabled?: boolean;
}

export default function CodeSectionHeader({
  subject,
  subtitle,
  onClickButton,
  isDivider = false,
  disabled = false,
}: CodeSectionHeaderProps) {
  const theme = useTheme();
  return (
    <SectionHeader
      backgroundColor={theme.colors.backgroundColor[200]}
      stickyHeader={true}
      justifyContent="space-between"
      paddingHorizontal={isDivider ? "0rem" : "1rem"}
      style={{
        boxShadow: `0 4px 4px -5px ${theme.colors.backgroundColor[700]}`,
      }}
    >
      <div>
        <Subject>{subject}</Subject>
        <Subtitle>{subtitle}</Subtitle>
      </div>
      {!isDivider && (
        <Button
          icon={<FiPlus />}
          disabled={disabled}
          label="추가"
          onClick={onClickButton}
        ></Button>
      )}
    </SectionHeader>
  );
}

const Subject = styled.span``;

const Subtitle = styled.span`
  margin-left: 0.3rem;
  font-weight: 300;
  font-size: 0.6rem;
  color: ${({ theme }) => theme.colors.fontColor[400]};
`;
