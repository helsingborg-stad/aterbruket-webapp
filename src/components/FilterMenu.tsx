/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useEffect } from "react";
import styled from "styled-components";
import { MdCancel } from "react-icons/md";

const Mask = styled.label`
  background-color: rgba(187, 186, 186, 0.509);
  border: none;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: block;
  height: 100%;
  box-sizing: border-box;

  &:focus-within {
    box-shadow: inset 0px 0px 0px 4px cyan;
  }
  &-btn {
    border: none;
    width: 1px;
    height: 1px;
    margin-left: -20px;
  }
`;

const FilterCtn = styled.div`
  display: ${({ className }) => (className === "show" ? "block" : "none")};
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 98vh;
  background-color: grey;
  border-radius: 15px 15px 0 0;
  box-shadow: 0px 0px 1px black;
  overflow: scroll;
`;

const FilterHeader = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  border-radius: 15px 15px 0 0;
  position: fixed;
  top: 2vh;
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
  height: 800px;
  background-color: yellow;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-coten: center;

  margin-top: 120px;
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
}

const FLITER_OPEN_CLASS = "openFilter";

const FilterMenu: FC<Props> = ({ isOpen, setIsOpen }: Props) => {
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
        {/* all the small filtering components, the following p tag is just for showing how it looks like, can be removed when component is added */}
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
          cum corrupti blanditiis excepturi, illum dolore fugiat consequuntur
          explicabo, laborum soluta exercitationem, totam amet omnis ab vel modi
          optio suscipit atque.
        </p>
        <button className="saveBtn" type="button">
          Spara
        </button>
        <button className="resetBtn" type="button">
          Avbryt/ Nollställ
        </button>
      </FilterBody>
    </FilterCtn>
  );
};

export default FilterMenu;
