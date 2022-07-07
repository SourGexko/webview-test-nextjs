import Image from "next/image";
import styled from "styled-components";
import Avatar from "../../atoms/Avatar/Avatar";
import Card, { CardProps } from "../../atoms/Card/Card";
import Chip from "../../atoms/Chip/Chip";
import HStack from "../../atoms/HStack/HStack";

interface ItemCardProps extends CardProps { }

export default function ItemCard({ minWidth, minHeight }: ItemCardProps) {
  return (
    <Card minWidth={minWidth} minHeight={minHeight}>
      <Avatar
        image={
          <Image
            src="/assets/images/ta_500.png"
            layout="fill"
            objectFit="contain"
            alt="item-image"
          />
        }
        backgroundColor="transparent"
        width="4rem"
        height="4rem"
      />
      <Title>TA-500</Title>
      <HStack style={{ gap: "0.5rem", flexWrap: "wrap" }}>
        <Chip backgroundColor="orange" value="현금" />
        <Chip backgroundColor="gray" value="카드" />
      </HStack>
      <Date>2022.04.26</Date>
    </Card>
  );
}

const Title = styled.div`
  font-weight: 700;
`;

const Date = styled.div`
  font-weight: 100;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.fontColor.default};
`;
