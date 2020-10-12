import React, { FC } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const ModalDiv = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 50%;
  background-color: #d35098;
`;

const ContentWrapper = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 1px solid yellow;
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
