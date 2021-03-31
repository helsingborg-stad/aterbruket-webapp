import React, { FC, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import { API, Storage } from "aws-amplify";
import styled from "styled-components";
import { MdNewReleases, MdSearch, MdTune } from "react-icons/md";
import { ImQrcode } from "react-icons/im";
import { listAdverts } from "../graphql/queries";
import { ListAdvertsQuery } from "../API";
import AdvertContainer from "../components/AdvertContainer";
import Modal from "../components/Modal";
import ModalAddItemContent from "../components/ModalAddItemContent";
import OpenCamera from "../components/OpenCamera";
import FilterMenu from "../components/FilterMenu";
import Pagination from "../components/Pagination";

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
  max-width: 700px;
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
  top: 27vh;
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
  max-width: 600px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  input {
    font-size: 16px;
  }

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

const TabCtn = styled.div`
  width: 100%;
  background-color: #f8f8f8;

  button {
    border: none;
    color: #707070;
    background-color: transparent;
    font-weight: 900;
    padding: 10px;
    margin-left: 30px;
    :active,
    :focus {
      color: #205400;
      border: none;
      border-bottom: 2px solid #a0c855;
      outline: none;
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
  const [isOpen, setIsOpen] = useState(false);
  const updateSearch = (event: React.ChangeEvent<any>) => {
    const { target } = event;
    const { value } = target;
    setSearchValue(value);
  };
  const [paginationOption, setPaginationOption] = useState({
    activePage: 1,
    totalPages: 1, // Will change after the fetch
    amountToShow: 15,
    itemLength: 14, // Will change after the fetch
  });

  const [items, setItems] = useState([]) as any;
  const [filterValueUpdated, setFilterValueUpdated] = useState(false);
  const [filterValue, setFilterValue] = useState({
    version: { eq: 0 },
    or: [],
  }) as any;
  const [renderItems, setRenderItems] = useState([]) as any;

  const handlePages = (updatePage: number) => {
    setPaginationOption({
      ...paginationOption,
      activePage: updatePage,
    });

    if (paginationOption.activePage !== updatePage) {
      if (updatePage === 1) {
        setRenderItems(items.slice(0, paginationOption.amountToShow - 1));
      } else {
        setRenderItems(
          items.slice(
            updatePage * paginationOption.amountToShow -
              paginationOption.amountToShow,
            updatePage * paginationOption.amountToShow - 1
          )
        );
      }
    }
  };

  const fetchItems = async () => {
    let result;
    if (filterValue.or.length > 0) {
      result = (await API.graphql(
        graphqlOperation(listAdverts, { filter: filterValue })
      )) as GraphQLResult<ListAdvertsQuery>;
    } else {
      result = (await API.graphql(
        graphqlOperation(listAdverts, {
          filter: { version: { eq: 0 } },
        })
      )) as GraphQLResult<ListAdvertsQuery>;
    }

    const advertItems: any = result.data?.listAdverts?.items;
    setPaginationOption({
      ...paginationOption,
      totalPages: Math.ceil(advertItems.length / paginationOption.amountToShow),
      itemLength: advertItems.length,
    });
    setItems(advertItems);

    setFilterValue({
      ...filterValue,
      or: [],
    });

    setRenderItems(advertItems.slice(0, paginationOption.amountToShow - 1));
  };
  useEffect(() => {
    fetchItems();
  }, [filterValueUpdated]);

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
          <TabCtn>
            <button type="button">INSPIRATION</button>
            <button type="button">KATEGORIER</button>
          </TabCtn>
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

            <button
              onClick={() => setIsOpen(true)}
              type="button"
              id="filterBtn"
            >
              Filter <MdTune id="filterIcon" />
            </button>

            <FilterMenu
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              // fetchItems={fetchItems}
              filterValueUpdated={filterValueUpdated}
              setFilterValueUpdated={setFilterValueUpdated}
              filterValue={filterValue}
              setFilterValue={setFilterValue}
            />
          </SearchFilterDiv>
          <AdvertContainer
            items={renderItems}
            searchValue={searchValue}
            itemsFrom="home"
          />
          {items.length > 0 && (
            <Pagination
              paginationOption={paginationOption}
              handlePagination={handlePages}
            />
          )}
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
