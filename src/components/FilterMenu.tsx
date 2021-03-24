/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { MdCancel } from "react-icons/md";
import FilterCheckbox from "../components/FilterCheckbox";
import { fieldsForm } from "../utils/formUtils";

const FilterCtn = styled.div`
  display: ${({ className }) => (className === "show" ? "block" : "none")};
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 98vh;
  background-color: #fcfcfc;
  border-radius: 15px 15px 0 0;
  box-shadow: 0px 0px 2px black;
  overflow: scroll;
`;

const FilterHeader = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  border-radius: 15px 15px 0 0;
  position: fixed;
  top: 1.8vh;
  background-color: #fcfcfc;

  .pageTitle {
    margin: 0 16px;
  }

  .cancelBtn {
    position: fixed;
    top: 25px;
    right: 15px;
    width: 32px;
    height: 32px;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: none;
    background-color: transparent;
  }

  .cancelIcon {
    color: #205400;
    font-size: 35px;
  }
`;

const FilterBody = styled.div`
  width: 90%;
  background-color: #fcfcfc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-coten: center;
  margin-top: 120px;
  margin-bottom: 20px;
  z-index: 1;
  padding: 16px;

  button {
    border: none;
  }

  .saveBtn {
    width: 350px;
    height: 56px;
    border-radius: 4.5px;
    font-weight: 500;
    background-color: #50811b;
    font-size: 18px;
    color: white;
  }

  .resetBtn {
    width: 135px;
    height: 24px;
    font-weight: 500;
    line-height: 23.76px;
    margin-top: 24px;
    text-align: center;
    padding: 0;
    color: #a3a3a3;
    background-color: white;
  }
`;

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setFilterValueUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  filterValue: any;
  setFilterValue: React.Dispatch<React.SetStateAction<any>>;
  conditionValues: any;
  setConditionValues: React.Dispatch<React.SetStateAction<any>>;

  filterValueUpdated: boolean;
}

const FLITER_OPEN_CLASS = "openFilter";

const FilterMenu: FC<Props> = ({
  isOpen,
  setIsOpen,
  setFilterValueUpdated,
  setFilterValue,
  filterValueUpdated,
  filterValue,
  conditionValues,

  setConditionValues,
}: Props) => {
  const [saveValues, setSaveValues] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add(FLITER_OPEN_CLASS);
    }

    return () => document.body.classList.remove(FLITER_OPEN_CLASS);
  }, [isOpen]);

  const closeFilter = (e: any) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  const handleSaveFilter = () => {
    let categories: any = [];
    let conditions: any = [];

    // let array: any = [];
    Object.entries(saveValues).forEach((entry: any) => {
      const [key, value] = entry;

      Object.keys(value).forEach((innerKey: string) => {
        if (value[innerKey] === true) {
          const addNewGroupe = { [key]: { eq: innerKey } };

          if (key === "category") {
            categories.push(addNewGroupe);
          } else if (key === "condition") {
            conditions.push(Object.keys(value)[0]);
            console.log("conditions", conditions);
          }

          // array.push(addNewGroupe);
        }
      });
    });

    setConditionValues([...conditions]);
    // setFilterValue({
    //   ...filterValue,
    //   or: [...filterValue.or.concat(array)],
    // });
    setFilterValue({
      ...filterValue,
      or: [...filterValue.or.concat(categories)],
    });

    setIsOpen(false);
    setFilterValueUpdated(!filterValueUpdated);
    //  array = [];
    categories = [];
    conditions = [];
  };
  const handleCancelFilter = () => {
    setFilterValue({
      ...filterValue,
      or: [],
    });
    setSaveValues({});
  };

  return (
    <FilterCtn className={isOpen ? "show" : "hide"}>
      <FilterHeader>
        <button
          className="cancelBtn"
          onClick={(e) => closeFilter(e)}
          type="button"
        >
          <MdCancel className="cancelIcon" />
        </button>
        <h1 className="pageTitle">Filtrera</h1>
      </FilterHeader>
      <FilterBody>
        <FilterCheckbox
          setSaveValues={setSaveValues}
          group={fieldsForm[2]}
          saveValues={saveValues}
        />
        <FilterCheckbox
          setSaveValues={setSaveValues}
          group={fieldsForm[9]}
          saveValues={saveValues}
        />
        {/* all the small filtering components, the following p tag is just for showing how it looks like, can be removed when component is added */}

        <button className="saveBtn" type="button" onClick={handleSaveFilter}>
          Spara
        </button>
        <button className="resetBtn" type="button" onClick={handleCancelFilter}>
          Avbryt/ Nollställ
        </button>
      </FilterBody>
    </FilterCtn>
  );
};

export default FilterMenu;
