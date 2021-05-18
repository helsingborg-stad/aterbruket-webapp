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
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  console.log(data);
  return (
    <GroupDiv>
      <Doughnut data={data} />
    </GroupDiv>
  );
};

export default StaticsCharts;
