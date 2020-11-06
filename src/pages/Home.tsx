import React, { FC, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";
import styled from "styled-components";
import { MdNewReleases, MdSearch, MdTune } from "react-icons/md";
import { ImQrcode } from "react-icons/im";
import { listAdvertisements } from "../graphql/queries";
import { ListAdvertisementsQuery } from "../API";
import AdvertContainer from "../components/AdvertContainer";
import Modal from "../components/Modal";
import ModalAddItemContent from "../components/ModalAddItemContent";
import OpenCamera from "../components/OpenCamera";


const AddBtn = styled.button`
  position: fixed;
  bottom: 10vh;
  background-color: #205400;
  color: white;
  display: flex;
  align-items: center;
  border: 0;
  padding: 0px 0px 0px 12px;
  width: 90%;
  height: 50px;
  border-radius: 14.5px;
  box-shadow: 0px 0px 2px rgba(98, 98, 98, 0.18),
    0px 3px 2px rgba(98, 98, 98, 0.12), 0px 6px 8px rgba(98, 98, 98, 0.12),
    0px 10px 16px rgba(98, 98, 98, 0.12), 0px 26px 32px rgba(98, 98, 98, 0.12);
  font-weight: 500;
  font-size: 18px;

  p {
    margin-left: 8px;
  }
  svg {
    font-size: 25px;
  }
`;

const ScanBtn = styled.button`
  border: none;
  width: 56px;
  height: 56px;
  background-color: #50811b;
  box-shadow: 0px 0px 2px rgba(98, 98, 98, 0.18),
    0px 3px 2px rgba(98, 98, 98, 0.12), 0px 6px 8px rgba(98, 98, 98, 0.12),
    0px 10px 16px rgba(98, 98, 98, 0.12), 0px 26px 32px rgba(98, 98, 98, 0.12);
  border-radius: 34.5px;
  position: absolute;
  top: 32vh;
  right: 30px;
  outline: none;

  div {
    width: 28px;
    height: 28px;
    background-color: #205400;
    border-radius: 4px;
    display: inline-block;
  }

  svg {
    width: 24px;
    height: 24px;
    color: white;
    padding: 2px;
    border-radius: 4px;
  }
`;

const SearchFilterDiv = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .searchWrapper {
    position: relative;

    #searchIcon {
      position: absolute;
      top: 47px;
      left: 20px;
      color: #50811b;
      font-size: 16px;
    }

    #searchInput {
      width: 240px;
      height: 25px;
      margin: 30px 0;
      padding: 12px 0px 12px 40px;
      display: flex;
      align-items: flex-start;
      border-radius: 17.5px;
      border: none;
      background-color: #f5f5f5;
    }
  }

  #filterBtn {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 80px;
    line-height: 16px;
    font-size: 16px;
    border: none;
    background-color: transparent;

    #filterIcon {
      color: #50811b;
      font-size: 18px;
    }
  }
`;
interface IQrCamera {
  delay: number;
  result: string;
}

type Props = {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAlreadyAQRCode: React.Dispatch<React.SetStateAction<boolean>>;
  qrCamera: IQrCamera;
  setQrCamera: React.Dispatch<
    React.SetStateAction<{
      delay: number;
      result: string;
    }>
  >;
};

const Home: FC<Props> = ({
  modalOpen,
  setModalOpen,
  setAlreadyAQRCode,
  qrCamera,
  setQrCamera,
}: Props) => {
  const [showQRCamera, setShowQRCamera] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const updateSearch = (event: React.ChangeEvent<any>) => {
    const { target } = event;
    const { value } = target;
    setSearchValue(value);
    // console.log(value);
  };

  const [items, setItems] = useState([]) as any;

  const fetchItems = async () => {
    const result = (await API.graphql(
      graphqlOperation(listAdvertisements)
    )) as GraphQLResult<ListAdvertisementsQuery>;
    const advertItems = result.data?.listAdvertisements?.items;

    setItems(advertItems);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (qrCamera.result.length > 2) {
    return <Redirect to={`/item/${qrCamera.result}`} />;
  }

  


  return (
    <main>
      {showQRCamera ? (
        <>
          <button type="button" onClick={() => setShowQRCamera(false)}>
            X
          </button>
          <OpenCamera qrCamera={qrCamera} setQrCamera={setQrCamera} />
        </>
      ) : (
        <>
          <Modal modalOpen={modalOpen}>
            <ModalAddItemContent
              setModalOpen={setModalOpen}
              setAlreadyAQRCode={setAlreadyAQRCode}
            />
          </Modal>
          <ScanBtn type="button" onClick={() => setShowQRCamera(true)}>
            <div>
              <ImQrcode />
            </div>
          </ScanBtn>
          <SearchFilterDiv>
            <div className="searchWrapper">
              <MdSearch id="searchIcon" />
              <input
                id="searchInput"
                type="text"
                placeholder="Sök"
                onChange={updateSearch}
              />
            </div>

            <button type="button" id="filterBtn">
              Filter <MdTune id="filterIcon" />
            </button>
          </SearchFilterDiv>
          <AdvertContainer items={items} searchValue={searchValue} />
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
        </>
      )}
    </main>
  );
};

export default Home;
