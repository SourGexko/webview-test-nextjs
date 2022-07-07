import React from "react";
import styled from "styled-components";
import Avatar from "../../atoms/Avatar/Avatar";
import Card, { CardProps } from "../../atoms/Card/Card";
import HStack from "../../atoms/HStack/HStack";
import VStack from "../../atoms/VStack/VStack";

interface StatCardProps extends CardProps {
  icon: React.ReactNode;
  subject: string;
  value: number | string | React.ReactNode;
  description?: string;
  avatarColor?: string;
}

export default function StatCard({
  icon,
  avatarColor,
  subject,
  value,
  minWidth,
  minHeight,
  description,
}: StatCardProps) {
  return (
    <Card minWidth={minWidth} minHeight={minHeight}>
      <HStack style={{ width: "100%", justifyContent: "space-around" }}>
        <VStack style={{ justifyContent: "center" }}>
          <Subject>{subject}</Subject>
          <Value>{value}</Value>
        </VStack>
        <Avatar
          width="4rem"
          height="4rem"
          backgroundColor={avatarColor}
          color="white"
          image={icon}
        />
      </HStack>
      <Description>{description}</Description>
    </Card>
  );
}

const Subject = styled.div`
  font-size: 0.8rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.fontColor[600]};
`;

const Value = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 4rem;
  font-weight: 700;
`;

const Description = styled.div`
  color: ${({ theme }) => theme.colors.fontColor[500]};
  font-weight: 300;
  font-size: 0.8rem;
`;
