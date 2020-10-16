import React, { FC } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const ModalDiv = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #ffa99b;
`;

const ContentWrapper = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;

type Props = {
  modalOpen: boolean;
};

const Modal: FC<Props> = ({ modalOpen, children }) => {
  if (!modalOpen) return null;

  return createPortal(
    <ModalDiv>
      <ContentWrapper>{children}</ContentWrapper>
    </ModalDiv>,
    document.body
  );
};

export default Modal;
