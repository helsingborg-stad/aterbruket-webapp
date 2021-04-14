import React, { FC, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import { API, Storage } from "aws-amplify";
import styled from "styled-components";
import { MdNewReleases, MdSearch, MdTune, MdPhotoCamera } from "react-icons/md";
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
  background-color: ${(props) => props.theme.colors.primaryDark};
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
  background-color: ${(props) => props.theme.colors.primary};
  box-shadow: 0px 0px 2px rgba(98, 98, 98, 0.18),
    0px 3px 2px rgba(98, 98, 98, 0.12), 0px 6px 8px rgba(98, 98, 98, 0.12),
    0px 10px 16px rgba(98, 98, 98, 0.12), 0px 26px 32px rgba(98, 98, 98, 0.12);
  border-radius: 34.5px;
  position: absolute;
  top: 16vh;
  right: 30px;
  outline: none;

  svg {
    color: white;
    border-radius: 4px;
    font-size: 37px;
    padding-top: 5px;
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
      color: ${(props) => props.theme.colors.primaryDark};
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
      background-color: ${(props) => props.theme.colors.lightGray};
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
      color: ${(props) => props.theme.colors.primaryDark};
      font-size: 18px;
    }
  }
`;

/* const TabCtn = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.offWhite};

  button {
    border: none;
    color: #707070;
    background-color: transparent;
    font-weight: 900;
    padding: 10px;
    margin-left: 30px;
    :active,
    :focus {
      color: ${(props) => props.theme.colors.primaryDark};
      border: none;
      border-bottom: 2px solid #a0c855;
      outline: none;
    }
  }
`; */
interface IQrCamera {
  delay: number;
  result: string;
}

interface Item {
  condition: string;
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
  const [conditionValues, setConditionValues] = useState<string[]>([]);
  const [error, setError] = useState(false);
  const [filterValue, setFilterValue] = useState({
    version: { eq: 0 },
    status: { eq: "available" },
    or: [],
  }) as any;
  const [renderItems, setRenderItems] = useState([]) as any;

  const handlePages = (updatePage: number) => {
    setPaginationOption({
      ...paginationOption,
      activePage: updatePage,
    });

    if (paginationOption.activePage !== updatePage) {
      const start = (updatePage - 1) * paginationOption.amountToShow;
      const end = start + paginationOption.amountToShow;

      setRenderItems(items.slice(start, end));
    }
  };

  const filterConditions: any = (fetchedData: any, conditions: any) => {
    let copyItems: any[] = [];
    let results: any[] = [];
    copyItems = fetchedData.data?.listAdverts?.items;
    results = copyItems.filter((item: Item) => {
      return conditions.includes(item.condition);
    });

    return results;
  };

  const fetchItems = async () => {
    let result = [] as any;
    let filteredResult: any[] = [];
    let advertItems = [] as any;

    if (filterValue.or.length === 0 && conditionValues.length > 0) {
      result = (await API.graphql(
        graphqlOperation(listAdverts, {
          filter: { version: { eq: 0 }, status: { eq: "available" } },
        })
      )) as GraphQLResult<ListAdvertsQuery>;

      filteredResult = filterConditions(result, conditionValues);
    } else if (filterValue.or.length > 0 || conditionValues.length > 0) {
      result = (await API.graphql(
        graphqlOperation(listAdverts, { filter: filterValue })
      )) as GraphQLResult<ListAdvertsQuery>;

      if (conditionValues.length === 0) {
        filteredResult = [...result?.data?.listAdverts?.items];
      } else {
        filteredResult = filterConditions(result, conditionValues);
      }
    } else {
      result = (await API.graphql(
        graphqlOperation(listAdverts, {
          filter: { version: { eq: 0 }, status: { eq: "available" } },
        })
      )) as GraphQLResult<ListAdvertsQuery>;
    }

    if (filteredResult.length > 0) {
      advertItems = [...filteredResult];
      setError(false);
    } else if (filterValue.or.length > 0 && filteredResult.length === 0) {
      setError(true);
    } else if (conditionValues.length > 0 && filteredResult.length === 0) {
      setError(true);
    } else if (filterValue.or.length === 0) {
      advertItems = result?.data?.listAdverts?.items;
      setError(false);
    }

    setItems(advertItems);

    setFilterValue({
      ...filterValue,
      or: [],
    });

    setConditionValues([]);
    setPaginationOption({
      ...paginationOption,
      totalPages: Math.ceil(advertItems.length / paginationOption.amountToShow),
      itemLength: advertItems.length,
    });

    setRenderItems(advertItems.slice(0, paginationOption.amountToShow));
  };

  useEffect(() => {
    fetchItems();
  }, [filterValueUpdated]);

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
            <MdPhotoCamera />
          </ScanBtn>
          {/* <TabCtn>
            <button type="button">INSPIRATION</button>
            <button type="button">KATEGORIER</button>
          </TabCtn> */}
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
              filterValueUpdated={filterValueUpdated}
              setFilterValueUpdated={setFilterValueUpdated}
              filterValue={filterValue}
              setFilterValue={setFilterValue}
              setConditionValues={setConditionValues}
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
          {error && <h4> Vi hittade visst inget med dina filter </h4>}
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
