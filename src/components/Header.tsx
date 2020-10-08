/* eslint-disable react/button-has-type */
import React, { FC, useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import ModalAddItemContent from "./ModalAddItemContent";

const HeaderDiv = styled.header`
  border: 1px solid black;
`;

type Props = {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header: FC<Props> = ({ modalOpen, setModalOpen }) => {
  return (
    <HeaderDiv>
      <Modal modalOpen={modalOpen}>
        <ModalAddItemContent setModalOpen={setModalOpen} />
      </Modal>

      <h1>Återbruket</h1>
      <button onClick={() => setModalOpen(true)}>Add Item</button>
    </HeaderDiv>
  );
};

export default Header;

// This doesn't work right now, but let it be down here for a second.
/* 
 {window.location.pathname === "/add" ? null : (
        <button onClick={() => setModalOpen(true)}>Add Item</button>
      )} */
