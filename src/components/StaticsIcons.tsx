/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import React, { useEffect, useState, FC, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { FaChair } from "react-icons/fa";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";

import styled from "styled-components";

const GroupDiv = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;

  margin-bottom: 8px;
  padding: 24px;
`;

const ItemGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 500;

  margin: 5px;

  .value {
    color: ${(props) => props.theme.colors.primaryDark};
    font-weight: 700;
    font-size: 18px;
  }

  .amount {
    color: ${(props) => props.theme.colors.secondaryDark};
    font-weight: 500;
    font-size: 18px;
  }

  .key {
    color: ${(props) => props.theme.colors.monoLight};
    font-weight: 900;
    font-size: 14px;
  }

  .iconContainer {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 54px;
    width: 54px;

    border: 1px solid ${(props) => props.theme.colors.secondaryDark};
    border-radius: 100%;
    color: ${(props) => props.theme.colors.primaryDark};
  }
`;

interface Props {
  group: any;
}

const StaticsIcons: FC<Props> = ({ group }) => {
  const { categoryAmount, sweOp } = group;
  console.log(categoryAmount);

  return (
    <GroupDiv>
      {categoryAmount &&
        Object.entries(categoryAmount).map(([key, value]) => {
          console.log(key, value);
          if ((value as number) > 0) {
            return (
              <ItemGroup key={key}>
                <div className="iconContainer">
                  <FaChair />
                </div>
                <p className="value">
                  {" "}
                  {value as number} <span className="amount"> st</span>
                </p>
                <p className="key">{key}</p>
              </ItemGroup>
            );
          }
        })}
    </GroupDiv>
  );
};

export default StaticsIcons;
