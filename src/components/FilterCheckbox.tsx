import React, { FC } from "react";
import styled from "styled-components";

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
      border-radius: 4px;

      width: 18px;
      height: 18px;
      margin: 19px;
    }

    input[type="checkbox"]:checked,
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

interface Props {
  group: any;
  saveValues: any;
  setSaveValues: any;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterCheckbox: FC<Props> = ({
  setSaveValues,
  saveValues,
  group,
  setIsDisabled,
}: Props) => {
  const handleInputChange = (e: React.ChangeEvent<any>, groupName: any) => {
    setSaveValues({
      ...saveValues,
      [groupName]: {
        ...saveValues[groupName],
        [e.target.name]: e.target.checked,
      },
    });
  };

  let cates: any = [];
  let condis: any = [];

  Object.entries(saveValues).forEach((entry: any) => {
    const [key, value] = entry;

    Object.keys(value).forEach((innerKey: string) => {
      if (value[innerKey] === true) {
        if (key === "category") {
          cates.push(innerKey);
        } else if (key === "condition") {
          condis.push(innerKey);
        }
      }
    });
  });

  // if (cates.length === 0 && condis.length === 0) {
  //   setIsDisabled(true);
  // } else {
  //   setIsDisabled(false);
  // }

  let checkboxes: any;

  if (group.option) {
    // Area of use should be here
  } else {
    checkboxes = group.eng.map((element: any, idx: number) => {
      return (
        <InputGroup key={element}>
          <input
            type="checkbox"
            name={element}
            onChange={(e) => handleInputChange(e, [group.name])}
            checked={
              !!(saveValues[group.name] && saveValues[group.name][element])
            }
          />
          <label htmlFor={element}>{group.swe[idx]} </label>
        </InputGroup>
      );
    });
  }

  return (
    <GroupCtn>
      {group.title}
      {checkboxes}
    </GroupCtn>
  );
};

export default FilterCheckbox;
