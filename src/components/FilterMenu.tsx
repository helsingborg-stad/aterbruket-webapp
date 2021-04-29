/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { MdCancel } from "react-icons/md";
import FilterCheckbox from "./FilterCheckbox";
import SortRadioButtons from "./SortRadioButtons";
import { fieldsForm } from "../utils/formUtils";
import { DEFAULTSORTVALUE } from "../utils/sortValuesUtils";

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
    background-color: ${(props) => props.theme.colors.primary};
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

type ISorting = {
  first: string;
  second: string;
  sortTitle: string;
  secText: string;
};

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setFilterValueUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  filterValue: any;
  setFilterValue: React.Dispatch<React.SetStateAction<any>>;
  setConditionValues: React.Dispatch<React.SetStateAction<any>>;
  filterValueUpdated: boolean;
  setAllValues: React.Dispatch<React.SetStateAction<any>>;
  setActiveSorting: React.Dispatch<React.SetStateAction<ISorting>>;
  activeSorting: ISorting;
}

const FLITER_OPEN_CLASS = "openFilter";

const FilterMenu: FC<Props> = ({
  isOpen,
  setIsOpen,
  setFilterValueUpdated,
  setFilterValue,
  filterValueUpdated,
  filterValue,
  setConditionValues,
  setAllValues,
  activeSorting,
  setActiveSorting,
}: Props) => {
  const [saveValues, setSaveValues] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const [newSorting, setNewSorting] = useState({
    first: activeSorting.first,
    second: activeSorting.second,
    sortTitle: activeSorting.sortTitle,
    secText: activeSorting.secText,
  });
  const [showToggle, setShowToggle] = useState(activeSorting.sortTitle);
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
    let cateValues: any = [];
    let conditions: any = [];

    Object.entries(saveValues).forEach((entry: any) => {
      const [key, value] = entry;

      Object.keys(value).forEach((innerKey: string) => {
        const group = { [key]: { eq: innerKey } };
        if (value[innerKey] === true) {
          if (key === "category") {
            categories.push(group);
            cateValues.push(innerKey);
          } else if (key === "condition") {
            conditions.push(innerKey);
          }
        }
      });
    });
    setAllValues([...cateValues, ...conditions]);
    setFilterValue({
      ...filterValue,
      or: [...filterValue.or.concat(categories)],
    });
    setConditionValues(conditions);
    setIsOpen(false);
    setFilterValueUpdated(!filterValueUpdated);

    categories = [];
    conditions = [];
    setActiveSorting({ ...newSorting });
  };

  const handleCancelFilter = () => {
    setFilterValue({
      ...filterValue,
      or: [],
    });
    setConditionValues([]);
    setSaveValues({});
    setFilterValueUpdated(!filterValueUpdated);
    setAllValues([]);
    setActiveSorting(DEFAULTSORTVALUE);
    setNewSorting(DEFAULTSORTVALUE);
    setShowToggle(DEFAULTSORTVALUE.sortTitle);
  };

  useEffect(() => {
    const count: string[] = [];
    Object.entries(saveValues).forEach((entry: any) => {
      const [key, value] = entry;

      Object.keys(value).forEach((innerKey: string) => {
        if (value[innerKey] === true) {
          if (key === "category") {
            count.push(innerKey);
          } else if (key === "condition") {
            count.push(innerKey);
          }
        }
      });
    });

    if (count.length === 0 && newSorting.first === activeSorting.first) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [newSorting, saveValues]);

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
        <SortRadioButtons
          setNewSorting={setNewSorting}
          groupTitle="SORTERING"
          newSorting={newSorting}
          setShowToggle={setShowToggle}
          showToggle={showToggle}
        />
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
        <button
          disabled={isDisabled}
          style={{
            backgroundColor: isDisabled ? "#F5F5F5" : "#50811B",
            color: isDisabled ? "#A3A3A3" : "white",
          }}
          className="saveBtn"
          type="button"
          onClick={handleSaveFilter}
        >
          Spara
        </button>
        <button
          style={{ display: isDisabled ? "none" : "block" }}
          className="resetBtn"
          type="button"
          onClick={handleCancelFilter}
        >
          Avbryt/ Nollställ
        </button>
      </FilterBody>
    </FilterCtn>
  );
};

export default FilterMenu;
