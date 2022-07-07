import React from "react";
import styled from "styled-components";
import Card from "../../atoms/Card/Card";

interface InfoCardProps {
  subject: string;
  value: string | number | React.ReactNode;
}

export default function InfoCard({ subject, value }: InfoCardProps) {
  return (
    <Card
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
      minHeight="3rem"
    >
      <Subject>{subject}</Subject>
      <Value>{value}</Value>
    </Card>
  );
}

const Subject = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.backgroundColor[600]};
`;

const Value = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  width: 60%;
  overflow: hidden;
  word-break: keep-all;
  text-overflow: ellipsis;
`;
