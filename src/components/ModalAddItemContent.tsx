/* eslint-disable no-console */

import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ModalHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: space-around;

  button {
    height: 20px;
    width: auto;
    cursor: pointer;
  }
`;

const ContentDiv = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  button {
    cursor: pointer;
  }
`;

type Props = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAlreadyAQRCode: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalAddItemContent: FC<Props> = ({
  setModalOpen,
  setAlreadyAQRCode,
}) => (
  <>
    <ModalHeader>
      <h2>Add item modal</h2>
      <button type="button" onClick={() => setModalOpen(false)}>
        <span>Close</span>
      </button>
    </ModalHeader>

    <ContentDiv>
      <p>Does you item already have a QR-code on it?</p>
      <Link to="/add">
        <button
          type="button"
          onClick={() => {
            setModalOpen(false);
            setAlreadyAQRCode(false);
          }}
        >
          No, the item does <strong>not</strong> have a QR-code
        </button>
      </Link>

      <Link to="/add">
        <button
          type="button"
          onClick={() => {
            setModalOpen(false);
            setAlreadyAQRCode(true);
          }}
        >
          Yes, the item does have a QR-code already
        </button>
      </Link>
    </ContentDiv>
  </>
);

export default ModalAddItemContent;
