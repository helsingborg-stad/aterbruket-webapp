/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import React, { useEffect, useState, FC, useContext } from "react";

import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";

import styled from "styled-components";

const GroupDiv = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  min-width: 382px;
  min-height: 74px;

  border: 1px solid ${(props) => props.theme.colors.illustration};
  border-radius: 9.5px;
  color: ${(props) => props.theme.colors.primaryDark};

  background-color: ${(props) => props.theme.colors.primaryLighter};
  margin-bottom: 8px;
  padding: 24px;
`;

const ClaspedInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 26px;

  .group {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .amount {
    font-weight: 500;
    color: ${(props) => props.theme.colors.secondaryDark};
    margin-right: 23px;
    margin-left: 4px;
  }

  .iconContainer {
    display: flex;
    flex-direction: column;
    color: ${(props) => props.theme.colors.secondaryDark};
  }
`;

const ExpandCard = styled.div`
font-weight: 500;
color: red;

}
`;

interface Props {
  group: any;
}

const CardStatics: FC<Props> = ({ group }) => {
  const [expandCard, setExpandCard] = useState(false);
  console.log(group.categoryAmount);
  const handleCard = () => {
    setExpandCard(!expandCard);
  };
  console.log("prssed on a card", expandCard);
  return (
    <GroupDiv onClick={handleCard}>
      <ClaspedInfo>
        <span>{group.sweOp}</span>
        <div className="group">
          <span>{group.items.length}</span>
          <span className="amount"> st</span>
          <div className="iconContainer">
            <RiArrowUpSLine />
            <RiArrowDownSLine />
          </div>
        </div>
      </ClaspedInfo>
      {expandCard && (
        <ExpandCard style={{ display: expandCard ? "flex" : "none" }}>
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including{" "}
        </ExpandCard>
      )}
    </GroupDiv>
  );
};

export default CardStatics;
