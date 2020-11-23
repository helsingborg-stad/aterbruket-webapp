import React, { FC } from "react";
import styled from "styled-components";

const InputGroup = styled.div`
   {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    background-color: ${(props) => props.theme.formTheme.backgroundColor};
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
      border: 1px solid ${(props) => props.theme.formTheme.backgroundColor};
      background-color: #80b14a;
      outline: none;
    }
  }
`;

const GroupCtn = styled.div`
   {
    width: 350px;
    height: 416px;
    margin-bottom: 48px;
  }
`;

interface Props {
  group: any;
  saveValues: any;
  setSaveValues: any;
}

const FilterCheckbox: FC<Props> = ({
  setSaveValues,
  saveValues,
  group,
}: Props) => {
  const handleInputChange = (
    e: React.ChangeEvent<any>,
    groupName: any,
    element: any
  ) => {
    const { target } = e;
    const value = target.type === "checkbox" ? target.checked : target.value;

    setSaveValues({
      ...saveValues,
      [groupName]: { ...saveValues[groupName], [element]: value },
    });
  };

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
            onChange={(e) => handleInputChange(e, [group.name], element)}
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
