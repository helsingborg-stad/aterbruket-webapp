import React, { FC } from "react";
import styled from "styled-components";

const InputGroup = styled.div`
   {
    color: ${(props) => props.theme.colors.dark};
    font-weight: 500;
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
      border: 2px solid ${(props) => props.theme.colors.illustration};
      border-radius: 4px;

      width: 18px;
      height: 18px;
      margin: 19px;
    }

    input[type="checkbox"]:checked,
    &:focus {
      border: 2px solid ${(props) => props.theme.colors.lightGray};
      background-color: ${(props) => props.theme.colors.primaryLight};
      outline: none;
    }

    label {
      font-weight: 500;
    }

    input[type="checkbox"]:checked + label,
    &:focus {
      font-weight: 900;
      color: ${(props) => props.theme.colors.darker};
    }
    
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
      letter-spacing: 0.5px;
    }
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
  const handleInputChange = (e: React.ChangeEvent<any>, groupName: any) => {
    setSaveValues({
      ...saveValues,
      [groupName]: {
        ...saveValues[groupName],
        [e.target.name]: e.target.checked,
      },
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
            id={element}
            name={element}
            onChange={(e) => handleInputChange(e, [group.name])}
            checked={
              !!(saveValues[group.name] && saveValues[group.name][element])
            }
          />
          <label
            htmlFor={element}
            className={
              saveValues[group.name] && saveValues[group.name][element]
                ? "active"
                : "normal"
            }
          >
            {group.swe[idx]}
          </label>
        </InputGroup>
      );
    });
  }

  return (
    <GroupCtn>
      <h2>{group.title.toUpperCase()}</h2>
      <Divider
        style={{
          width: group.title === "Skick" ? "37px" : "92px",
        }}
      />
      {checkboxes}
    </GroupCtn>
  );
};

export default FilterCheckbox;
