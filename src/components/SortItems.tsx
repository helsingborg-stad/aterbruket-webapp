import React, { FC } from "react";
import styled from "styled-components";
import { sortBy } from "sort-by-typescript";

const Button = styled.button`
  background-color: ${(props) => props.theme.appTheme.primaryColor};
  box-sizing: border-box;
  outline: none;
  cursor: pointer;

  height: 50px;
  width: 50px;
  border: none;
  border-radius: 4px;
  height: 30px;
  width: 45px;
  margin: 0 2px;

  &.active {
    border: 2px solid ${(props) => props.theme.colors.primary};
  }
  &.endButtons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
  }
  &.endButtons {
    &:hover {
      background-color: ${(props) => props.theme.colors.opacityPrimaryLight};
    }
  }
`;
type Props = {
  items: any;
};
const SortItems: FC<Props> = ({ items }) => {
  console.log(items);
  console.log("sorted ", items.sort(sortBy("createdAt")));
  return <Button>A-Ö</Button>;
};

export default SortItems;
