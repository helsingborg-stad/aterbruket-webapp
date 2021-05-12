/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import React, { useEffect, useState, FC, useContext } from "react";
import UserContext from "../contexts/UserContext";

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

  flex-direction: column;
  align-items: center;

  .group {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

interface Props {
  group: any;
  filterItems: any;
}

const CardStatics: FC<Props> = ({ group, filterItems }) => {
  const [expandCard, setExpandCard] = useState(false);
  const { user } = useContext(UserContext);
  const { categoryAmount, sweOp } = group;
  console.log(categoryAmount);
  const handleCard = () => {
    setExpandCard(!expandCard);
  };
  console.log("prssed on a card", expandCard);

  return (
    <GroupDiv>
      <ClaspedInfo onClick={handleCard}>
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
          {sweOp === "Inlaggda annonser" && (
            <div className="group">
              <button type="button" onClick={() => filterItems("all")}>
                Totalt
              </button>
              <button type="button" onClick={() => filterItems(user.sub)}>
                Dina annonser
              </button>
            </div>
          )}
          {categoryAmount &&
            Object.entries(categoryAmount).map(([key, value]) => {
              console.log(key, value);
              if ((value as number) > 0) {
                return (
                  <div key={key} className="group">
                    <span>{key}: </span>
                    <span> {value as number}</span>
                  </div>
                );
              }
            })}
        </ExpandCard>
      )}
    </GroupDiv>
  );
};

export default CardStatics;
