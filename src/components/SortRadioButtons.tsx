/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { sortValues } from "../utils/sortValuesUtils";

const InputGroup = styled.div`
   {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    background-color: ${(props) => props.theme.colors.lightGray};
    width: 350px;
    height: 56px;
    border-radius: 4.5px;
    margin: 16px 0px 16px 0px;

    input {
      appearance: none;
    }

    label {
      margin-right: 19px;
    }

    span {
      margin-left: 19px;
    }
    .radioInput{
      appearance: none;
      border: 1px solid #c9d6c2;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin: 19px;
    }

    .radioInput[type="radio"]:checked,
    &:focus {
      appearance: none;
      outline: none;
      border: none;
      
  }
`;
const GroupRadio = styled.div`
   {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    width: 70px;
    height: 100%;
  }
`;

const GroupCtn = styled.div`
   {
    width: 350px;
    height: 100%;
    margin-bottom: 3px;
  }
`;
type ISorting = {
  first: string;
  second: string;
  sortTitle: string;
};

type IElement = {
  title: string;
  id: string;
  low: string;
  lowText: string;
  high: string;
  highText: string;
  second: string;
};

interface Props {
  setNewSorting: React.Dispatch<React.SetStateAction<ISorting>>;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  groupTitle: string;
  newSorting: ISorting;
  activeSorting: ISorting;
  setShowToggle: React.Dispatch<React.SetStateAction<string>>;
  showToggle: string;
}

const SortRadioButtons: FC<Props> = ({
  setNewSorting,
  groupTitle,
  setIsDisabled,
  activeSorting,
  newSorting,
  setShowToggle,
  showToggle,
}: Props) => {
  const handleInputChange = (
    firstStr: string,
    secondStr: string,
    value: string
  ) => {
    setNewSorting({ first: firstStr, second: secondStr, sortTitle: value });

    // if (firstStr !== activeSorting.first) {
    //   console.log("hej hej ");
    //   setIsDisabled(false);
    // } else {
    //   setIsDisabled(true);
    // }
  };

  console.log("this is ", newSorting);
  const handleRadioInput = (e: any, low: string, secondStr: string) => {
    setShowToggle(e.target.value);
    setNewSorting({ first: low, second: secondStr, sortTitle: e.target.value });
  };
  console.log("show ", showToggle);
  const radio = sortValues.map((element: IElement) => {
    return (
      <InputGroup key={element.title}>
        <span>
          {element.title}
          {showToggle === element.title && ": "}
          {showToggle && newSorting.first === element.high && element.highText}
          {showToggle && newSorting.first === element.low && element.lowText}
        </span>
        <input
          className="radioInput"
          type="radio"
          id={element.title}
          name="sortingMaster"
          value={element.title}
          onChange={(e) => handleRadioInput(e, element.low, element.second)}
          checked={element.title === showToggle}
        />
        {showToggle === element.title && (
          <GroupRadio>
            <label
              htmlFor={element.high}
              style={{
                color: newSorting.first === element.high ? "#80B14A" : "black",
              }}
            >
              <FaArrowUp />
            </label>
            <input
              type="radio"
              id={element.high}
              name="sorting"
              value={element.title}
              onChange={() =>
                handleInputChange(element.high, element.second, element.title)
              }
              checked={newSorting.first === element.high}
            />
            <label
              htmlFor={element.low}
              style={{
                color: newSorting.first === element.low ? "#80B14A" : "black",
              }}
            >
              <FaArrowDown />
            </label>
            <input
              type="radio"
              id={element.low}
              name="sorting"
              value={element.title}
              onChange={() =>
                handleInputChange(element.low, element.second, element.title)
              }
              checked={newSorting.first === element.low}
            />
          </GroupRadio>
        )}
      </InputGroup>
    );
  });

  return (
    <>
      <GroupCtn>
        {groupTitle}
        {radio}
      </GroupCtn>
    </>
  );
};

export default SortRadioButtons;
