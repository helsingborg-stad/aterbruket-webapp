/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import React from "react";

import { Doughnut } from "react-chartjs-2";

import styled from "styled-components";

const GroupDiv = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;

  margin-bottom: 8px;
  padding: 24px;

  #myChart {
    height: 286px;
    width: 286px;
  }
`;

const StaticsCharts = ({ group }) => {
  const { label, values } = group;
  console.log(group);
  const data = {
    labels: label,
    datasets: [
      {
        label: "My First Dataset",
        data: values,
        backgroundColor: [
          "rgb(232, 76, 49)",
          "rgb(173, 66, 139)",
          "rgb(73, 137, 182)",
          "rgb(128, 177, 74)",
          "rgb(255, 152, 62)",
          "rgb(255, 130, 201)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  console.log(data);
  return (
    <GroupDiv>
      <Doughnut data={data} id="myChart" />
    </GroupDiv>
  );
};

export default StaticsCharts;
