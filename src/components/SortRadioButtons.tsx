/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import {
  FaArrowCircleDown,
  FaArrowCircleUp,
  FaArrowDown,
  FaArrowUp,
} from "react-icons/fa";
import { sortValues } from "../utils/sortValuesUtils";

const InputGroup = styled.div`
   {
     color: ${(props) => props.theme.colors.dark};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    
    
    .flexGroup {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%
    }
    .flexGroupNotActive {
      display: flex;
      flex-direction: row;
      align-items: center;
      
      width: 100%
    }

    background-color: ${(props) => props.theme.colors.lightGray};
    width: 350px;
    height: 56px;
    border-radius: 4.5px;
    margin: 16px 0px 19px 0px;

    input {
      appearance: none;
    }

   
    svg {
      font-size: 14px;
      padding: 4px 0 0 2px;
      color: ${(props) => props.theme.colors.primaryLight}
   
    }
    span {
      font-size: 18px;
      margin-left: 4px;
    }
    
    .masterRadio {
      margin-left: 19px; 
      font-weight: 500;
    }
    .active{
      margin-left: 19px; 
      font-weight: 900;
      color: ${(props) => props.theme.colors.darker};
    }
    
    .radioInput{
      appearance: none;
      border: 2px solid ${(props) => props.theme.colors.illustration};
      border-radius: 100%;
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
    justify-content: space-between;
    margin-right: 16px;

    width: 42px;
    height: 24px;
    border-radius: 23px;
    border: 2px solid ${(props) => props.theme.colors.illustration};

    label {
      height: 22px;
    }
  }
`;
const Divider = styled.div`
   {
    width: 71px;
    height: 2px;
    margin-top: 15px;
    background-color: ${(props) => props.theme.colors.primaryLighter};
  }
`;
const GroupCtn = styled.div`
   {
    width: 350px;
    height: 100%;
    margin-bottom: 3px;

    h2 {
      font-size: 12px;
      font-weight: 900;

      color: ${(props) => props.theme.colors.darker};
      margin-block-end: 0;
    }
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
  groupTitle: string;
  newSorting: ISorting;
  setShowToggle: React.Dispatch<React.SetStateAction<string>>;
  showToggle: string;
}

const SortRadioButtons: FC<Props> = ({
  setNewSorting,
  groupTitle,
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
  };

  const handleRadioInput = (e: any, low: string, secondStr: string) => {
    setShowToggle(e.target.value);
    setNewSorting({ first: low, second: secondStr, sortTitle: e.target.value });
  };

  const radio = sortValues.map((element: IElement) => {
    return (
      <InputGroup key={element.title}>
        <div
          className={
            showToggle !== element.title ? "flexGroup" : "flexGroupNotActive"
          }
        >
          <label
            className={showToggle === element.title ? "active" : "masterRadio"}
            htmlFor={element.title}
          >
            {element.title}
            {showToggle === element.title && ": "}
          </label>
          <span>
            {showToggle &&
              newSorting.first === element.high &&
              element.highText}
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
        </div>
        {showToggle === element.title && (
          <GroupRadio>
            <label
              htmlFor={element.high}
              style={{
                color:
                  newSorting.first === element.high ? "#80B14A" : "#6F9725",
              }}
            >
              {newSorting.first === element.high ? (
                <FaArrowCircleUp />
              ) : (
                <FaArrowUp />
              )}

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
            </label>
            <label
              htmlFor={element.low}
              style={{
                color: newSorting.first === element.low ? "#80B14A" : "#6F9725",
              }}
            >
              {newSorting.first === element.low ? (
                <FaArrowCircleDown />
              ) : (
                <FaArrowDown />
              )}

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
            </label>
          </GroupRadio>
        )}
      </InputGroup>
    );
  });

  return (
    <>
      <GroupCtn>
        <h2>{groupTitle}</h2>
        <Divider />
        {radio}
      </GroupCtn>
    </>
  );
};

export default SortRadioButtons;
