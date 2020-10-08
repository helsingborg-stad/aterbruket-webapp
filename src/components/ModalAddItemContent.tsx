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
  }
`;

const ContentDiv = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  button {
    margin-bottom: 20px;
  }
`;

type Props = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalAddItemContent: FC<Props> = ({ setModalOpen }) => (
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
        <button type="button" onClick={() => setModalOpen(false)}>
          No, the item does <strong>not</strong> have a QR-code
        </button>
      </Link>

      <button type="button" onClick={() => setModalOpen(false)}>
        Yes, the item does have a QR-code already
      </button>
    </ContentDiv>
  </>
);

/* ModalAddItemContent.propTypes = {
  setModalOpen: PropTypes.boolean.isRequired,
}; */

export default ModalAddItemContent;
