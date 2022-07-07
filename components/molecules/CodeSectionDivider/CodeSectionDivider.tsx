import { FiChevronRight } from "react-icons/fi";
import { Section } from "../../atoms/Section/Section";
import SectionBody from "../../atoms/SectionBody/SectionBody";
import CodeSectionHeader from "../CodeSectionHeader/CodeSectionHeader";

export default function CodeSectionDivider() {
  return (
    <Section style={{ flex: 0.05 }}>
      <CodeSectionHeader isDivider={true} />
      <SectionBody
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 0.1,
        }}
      >
        <FiChevronRight />
      </SectionBody>
    </Section>
  );
}
