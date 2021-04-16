import React, { FC } from "react";
import styled from "styled-components";
import { sortValues } from "../utils/sortValuesUtils";

const InputGroup = styled.div`
   {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    background-color: ${(props) => props.theme.colors.lightGray};
    width: 350px;
    height: 56px;
    border-radius: 4.5px;
    margin: 16px 0px 16px 0px;

    input {
      appearance: none;
      border: 1px solid #c9d6c2;
      border-radius: 50%;

      width: 18px;
      height: 18px;
      margin: 19px;
    }

    input[type="radio"]:checked,
    &:focus {
      border: 1px solid ${(props) => props.theme.colors.lightGray};
      background-color: ${(props) => props.theme.colors.primaryLight};
      outline: none;
    }
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
  id: string;
  value: string;
  first: string;
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
      <InputGroup key={element.id}>
        <label htmlFor={element.id}>{element.value}</label>
        <input
          type="radio"
          id={element.id}
          name="sorting"
          value={element.value}
          onChange={() =>
            handleInputChange(element.first, element.second, element.value)
          }
          checked={newSorting.first === element.first}
        />
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
