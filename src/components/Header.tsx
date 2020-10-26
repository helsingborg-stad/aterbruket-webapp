/* eslint-disable react/button-has-type */
import React, { FC } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import ModalAddItemContent from "./ModalAddItemContent";
import { AmplifySignOut } from "@aws-amplify/ui-react";

const HeaderDiv = styled.header`
  width: ${(props) => `${props.theme.headerTheme.width}%`};
  height: ${(props) => `${props.theme.headerTheme.height}px`};
  display: ${(props) => props.theme.headerTheme.display};
  flex-direction: ${(props) => props.theme.headerTheme.flexDirection};
  align-items: ${(props) => props.theme.headerTheme.alignItems};
  justify-content: ${(props) => props.theme.headerTheme.justifyContent};
  padding: ${(props) =>
    `${props.theme.headerTheme.padding[0]}px ${props.theme.headerTheme.padding[1]}px ${props.theme.headerTheme.padding[2]}px ${props.theme.headerTheme.padding[3]}px`};
  background-color: ${(props) => props.theme.headerTheme.backgroundColor};
  box-sizing: border-box;

  h2 {
    font-style: ${(props) => props.theme.headerTheme.fontStyle};
    font-weight: ${(props) => props.theme.headerTheme.fontWeight};
    font-size: ${(props) => `${props.theme.headerTheme.fontSize}px`};
    line-height: ${(props) => `${props.theme.headerTheme.lineHeight}%`};
  }

  a {
    text-decoration: none;
  }
  a:visited {
    color: black;
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
        <h2>
          Sånt du kan <br />
          Haffa!
        </h2>
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
