import React, { FC } from "react";
import styled from "styled-components";
import { MdNewReleases } from "react-icons/md";
import AdvertContainer from "../components/AdvertContainer";
import Modal from "../components/Modal";
import ModalAddItemContent from "../components/ModalAddItemContent";

const AddBtn = styled.button`
  position: fixed;
  bottom: 25px;
  background-color: #205400;
  color: white;
  display: flex;
  align-items: center;
  border: 0;
  padding: 0px 0px 0px 12px;
  width: 90%;
  height: 56px;
  border-radius: 14.5px;
  box-shadow: 0px 0px 2px rgba(98, 98, 98, 0.18),
    0px 3px 2px rgba(98, 98, 98, 0.12), 0px 6px 8px rgba(98, 98, 98, 0.12),
    0px 10px 16px rgba(98, 98, 98, 0.12), 0px 26px 32px rgba(98, 98, 98, 0.12);
  font-weight: 500;
  font-size: 18px;

  p {
    margin-left: 8px;
  }
`;

type Props = {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAlreadyAQRCode: React.Dispatch<React.SetStateAction<boolean>>;
};

const Home: FC<Props> = ({
  modalOpen,
  setModalOpen,
  setAlreadyAQRCode,
}: Props) => {
  return (
    <main>
      <Modal modalOpen={modalOpen}>
        <ModalAddItemContent
          setModalOpen={setModalOpen}
          setAlreadyAQRCode={setAlreadyAQRCode}
        />
      </Modal>
      <p>[Sökruta and filter goes here]</p>
      <AdvertContainer />
      <AddBtn
        type="button"
        onClick={() => {
          setModalOpen(true);
          setAlreadyAQRCode(false);
        }}
      >
        <MdNewReleases />
        <p>Gör en egen annons!</p>
      </AddBtn>
    </main>
  );
};

export default Home;
