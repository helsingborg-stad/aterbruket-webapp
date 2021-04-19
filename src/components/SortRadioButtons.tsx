import React, { FC } from "react";
import styled from "styled-components";
import { sortValues } from "../utils/sortValuesUtils";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

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
  high: string;
  second: string;
};

interface Props {
  //   handleSortItems: (str: string, secondStr: string) => void;
  setNewSorting: React.Dispatch<React.SetStateAction<ISorting>>;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  groupTitle: string;
  newSorting: ISorting;
  activeSorting: ISorting;
}

const SortRadioButtons: FC<Props> = ({
  setNewSorting,
  groupTitle,
  setIsDisabled,
  activeSorting,
  newSorting,
}: Props) => {
  const handleInputChange = (
    firstStr: string,
    secondStr: string,
    value: string
  ) => {
    console.log(firstStr, secondStr);
    setNewSorting({ first: firstStr, second: secondStr, sortTitle: value });

    // if (firstStr !== activeSorting.first) {
    //   console.log("hej hej ");
    //   setIsDisabled(false);
    // } else {
    //   setIsDisabled(true);
    // }
  };
  console.log("new ", newSorting.first, "act ", activeSorting.first);
  //

  const radio = sortValues.map((element: IElement) => {
    return (
      <InputGroup key={element.title}>
        <span>{element.title}</span>
        <GroupRadio>
          <label
            htmlFor={element.low}
            style={{
              color: newSorting.first === element.low ? "#80B14A" : "black",
            }}
          >
            <FaArrowUp />
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

          <label
            htmlFor={element.high}
            style={{
              color: newSorting.first === element.high ? "#80B14A" : "black",
            }}
          >
            <FaArrowDown />
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
        </GroupRadio>
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
