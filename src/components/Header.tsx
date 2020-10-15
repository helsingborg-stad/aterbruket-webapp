/* eslint-disable react/button-has-type */
import React, { FC } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import ModalAddItemContent from "./ModalAddItemContent";

const HeaderDiv = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #fbf7f0;

  button {
    cursor: pointer;
  }
`;

type Props = {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAlreadyAQRCode: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header: FC<Props> = ({ modalOpen, setModalOpen, setAlreadyAQRCode }) => {
  return (
    <HeaderDiv>
      <Modal modalOpen={modalOpen}>
        <ModalAddItemContent
          setModalOpen={setModalOpen}
          setAlreadyAQRCode={setAlreadyAQRCode}
        />
      </Modal>

      <h1>Återbruket</h1>
      <button
        onClick={() => {
          setModalOpen(true);
          setAlreadyAQRCode(false);
        }}
      >
        Add Item
      </button>
    </HeaderDiv>
  );
};

export default Header;

// This doesn't work right now, but let it be down here for a second.
/* 
 {window.location.pathname === "/add" ? null : (
        <button onClick={() => setModalOpen(true)}>Add Item</button>
      )} */
