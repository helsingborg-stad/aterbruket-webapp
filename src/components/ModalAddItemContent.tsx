import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MdClose, MdAdd } from "react-icons/md";
import { ImQrcode } from "react-icons/im";

const Modal = styled.div`
position: absolute;
bottom: 0;
background-color: #F5F5F5;
border-radius: 10px 10px 0 0;
width: 100%;   
height 157px;

`;
const ModalHeader = styled.div`
  width: 100%;
  height: 61px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 18px;
  font-weight: 500;
  border-radius: 10px 10px 0 0;
  background-color: #f8f8f8;

  .closeBtn {
    height: 20px;
    width: 20px;
    font-size: 20px;
    line-height: 20px;
    position: absolute;
    top: 30%;
    right: 5%;
    outline: 0;
    border: none;
    background-color: transparent;
  }
`;

const ModalBody = styled.div`
  width: 100%;
  height: calc(100% - 61px);
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;

  .link {
    width: 160px;
    height: 48px;
    display: inline-block;
    border-radius: 4.5px;
    margin: 0 8px;
    text-decoration: none;
  }

  .selectBtn {
    width: 160px;
    height: 48px;
    border-radius: 4.5px;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    border: none;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;

    .btnIcon {
      display: inline-block;
      margin-right: 5px;
    }
  }
  .scanBtn {
    color: ${(props) => props.theme.colors.primaryDark};
    background-color: ${(props) => props.theme.colors.primaryLighter};
  }
  .addBtn {
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.primary};
  }
`;

type Props = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAlreadyAQRCode: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalAddItemContent: FC<Props> = ({
  setModalOpen,
  setAlreadyAQRCode,
}: Props) => (
  <Modal>
    <ModalHeader>
      <button
        className="closeBtn"
        type="button"
        onClick={() => setModalOpen(false)}
      >
        <MdClose />
      </button>
      <p>Skapa en ny annons</p>
    </ModalHeader>
    <ModalBody>
      <Link className="link" to="/add">
        <button
          className="selectBtn scanBtn"
          type="button"
          onClick={() => {
            setModalOpen(false);
            setAlreadyAQRCode(true);
          }}
        >
          <ImQrcode className="btnIcon" />
          Skanna QR
        </button>
      </Link>
      <Link className="link" to="/add">
        <button
          className="selectBtn addBtn"
          type="button"
          onClick={() => {
            setModalOpen(false);
            setAlreadyAQRCode(false);
          }}
        >
          <MdAdd className="btnIcon" />
          Skapa Ny
        </button>
      </Link>
    </ModalBody>
  </Modal>
);

export default ModalAddItemContent;
