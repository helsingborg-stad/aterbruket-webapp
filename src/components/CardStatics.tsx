/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import React, { useEffect, useState, FC, useContext } from "react";
import UserContext from "../contexts/UserContext";
import StaticsIcons from "./StaticsIcons";
import StaticsCharts from "./StaticsCharts.js";
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

  background-color: ${(props) => props.theme.colors.lightGreen};
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

  .notActive {
    background-color: ${(props) => props.theme.colors.lightGreen};
    color: ${(props) => props.theme.colors.primaryDark};
    border: 2px solid ${(props) => props.theme.colors.primaryLighter};
  }
  .active {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.lightGreen};
    border: 2px solid ${(props) => props.theme.colors.secondaryDark};
  }
`;

const Buttons = styled.button`
  height: 38px;
  width: 167px;
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
  font-family: Roboto;
  font-style: normal;
  margin: 16px 0;
`;

interface Props {
  group: any;
  filterItems: any;
  specialHeading?: string;
}

const CardStatics: FC<Props> = ({ group, filterItems, specialHeading }) => {
  const [expandCard, setExpandCard] = useState(false);
  const { user } = useContext(UserContext);
  const { categoryAmount, sweOp } = group;
  const [chartData, setChartData] = useState({}) as any;
  const [active, setActive] = useState(1);

  const handleCard = () => {
    setExpandCard(!expandCard);
  };
  const handleChartData = () => {
    const labelArr = [] as any;
    const valuesArr = [] as any;

    Object.entries(categoryAmount).forEach((entrys) => {
      const [key, value] = entrys;
      if ((value as number) > 0) {
        const str = key + " " + value;

        labelArr.push(str as string);
        valuesArr.push(value as number);
      }
    });
    setChartData({
      label: labelArr as string[],
      values: valuesArr as number[],
    });
  };

  useEffect(() => {
    setChartData({});
    handleChartData();
    return () => {};
  }, [group]);

  return (
    <GroupDiv>
      <ClaspedInfo onClick={handleCard}>
        <span>{specialHeading}</span>
        <div className="group">
          <span>{group.items.length}</span>
          <span className="amount"> st</span>
          <div className="iconContainer">
            {expandCard ? (
              <>
                <RiArrowDownSLine /> <RiArrowUpSLine />
              </>
            ) : (
              <>
                <RiArrowUpSLine /> <RiArrowDownSLine />
              </>
            )}
          </div>
        </div>
      </ClaspedInfo>
      {expandCard && group.expandCard && (
        <ExpandCard style={{ display: expandCard ? "flex" : "none" }}>
          {sweOp === "Tillgängliga annonser" && (
            <div className="group">
              <Buttons
                onClick={() => (filterItems("all"), setActive(1))}
                style={{ borderRadius: "4.5px 0px 0px 4.5px" }}
                className={active === 1 ? "active" : "notActive"}
              >
                Totalt
              </Buttons>
              <Buttons
                onClick={() => (filterItems(user.sub), setActive(2))}
                style={{ borderRadius: "0px 4.5px 4.5px 0px" }}
                className={active === 2 ? "active" : "notActive"}
              >
                Dina annonser
              </Buttons>
            </div>
          )}
          {sweOp !== "Tillgängliga annonser" && <StaticsIcons group={group} />}
          {sweOp === "Tillgängliga annonser" && categoryAmount && (
            <StaticsCharts group={chartData} />
          )}
        </ExpandCard>
      )}
    </GroupDiv>
  );
};

export default CardStatics;
