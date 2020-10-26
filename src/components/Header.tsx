/* eslint-disable react/button-has-type */
import React, { FC } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import ModalAddItemContent from "./ModalAddItemContent";
import { AmplifySignOut } from "@aws-amplify/ui-react";

const HeaderDiv = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #fbf7f0;

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }
  a:visited {
    color: black;
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

      <Link to="/">
        <h1>Haffa</h1>
      </Link>
      <button
        onClick={() => {
          setModalOpen(true);
          setAlreadyAQRCode(false);
        }}
      >
        Add Item
      </button>
      <AmplifySignOut />
    </HeaderDiv>
  );
};

export default Header;

// This doesn't work right now, but let it be down here for a second.
/* 
 {window.location.pathname === "/add" ? null : (
        <button onClick={() => setModalOpen(true)}>Add Item</button>
      )} */
