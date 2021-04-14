/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-named-as-default-member */
/* global google */

import React, { FC, useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import { graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import { API, Storage } from "aws-amplify";
import QRCode from "../components/QRCodeContainer";
import { GetAdvertQuery } from "../API";
import { getAdvert } from "../graphql/queries";
import { createAdvert, updateAdvert } from "../graphql/mutations";
import EditItemForm from "../components/EditItemForm";
// import { loadMapApi } from "../utils/GoogleMapsUtils";
// import Map from "../components/Map";
import CarouselComp from "../components/CarouselComp";
import { UserContext } from "../contexts/UserContext";
import RegiveForm from "../components/RegiveForm";
import showDays from "../hooks/showDays";
import { fieldsForm } from "../utils/formUtils";
import { MdArrowBack } from "react-icons/md";

const TopSection = styled.div`
  background-color: ${(props) => props.theme.colors.offWhite};
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  box-shadow: 0px 1px 0px rgba(86, 86, 86, 0.16);

  .reservedHeader {
    background-color: ${(props) => props.theme.colors.primaryLighter};

    .headerTitle--reserved {
      margin: 26px 0 0 0;
    }
    .reservedP {
      color: ${(props) => props.theme.colors.primaryDark};
      font-size: 14px;
      margin: 0;
    }
  }

  header {
    position: relative;
    width: 100%;
    text-align: center;
    height: 75px;
    position: fixed;
    background-color: ${(props) => props.theme.colors.offWhite};

    svg {
      position: absolute;
      left: 28px;
      bottom: 16px;
      font-size: 24px;
      color: ${(props) => props.theme.colors.darkest};
    }
    p,
    .headerTitle {
      margin: 35px 0 0 0;
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 132%;
      color: ${(props) => props.theme.colors.darkest};
    }
  }

  button {
    border: 2px solid ${(props) => props.theme.colors.primary};
    outline: none;
    width: 100px;
    height: 30px;
    background-color: white;
    margin: 5px;
    border-radius: 5px;
  }
  .haffaBtn {
    box-shadow: 0px 0px 2px rgba(98, 98, 98, 0.18),
      0px 3px 2px rgba(98, 98, 98, 0.12), 0px 6px 8px rgba(98, 98, 98, 0.12),
      0px 10px 16px rgba(98, 98, 98, 0.12), 0px 26px 32px rgba(98, 98, 98, 0.12);
    border-radius: 4.5px;
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.white};
    font-weight: 900;
    font-size: 18px;
    line-height: 132%;
    letter-spacing: 0.015em;
    width: 340px;
    height: 56px;
    border: none;
    margin: 0 12px 24px 12px;
  }

  .haffaBtn--pickUp {
    background-color: ${(props) => props.theme.colors.primaryLight};
  }
  .titleDiv {
    width: 100%;
    h4 {
      margin: 48px 32px 12px 32px;

      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 112%;
      letter-spacing: 0.0025em;
      color: ${(props) => props.theme.colors.primaryDark};
    }
    h1 {
      font-family: Roboto;
      font-style: normal;
      font-weight: 900;
      font-size: 36px;
      line-height: 124%;
      margin: 0px 32px 24px 32px;
    }
  }

  .removeReservationP {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: ${(props) => props.theme.colors.dark};
    margin: 24px 0 32px 0;
  }

  .regiveBtn {
    width: 111px;
  }
`;

const ImgDiv = styled.div`
  width: 100%;
  height: 256px;
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.offWhite};
  margin-top: 75px;

  img {
    max-height: 256px;
    width: 100vw;
    margin: 0;
    object-fit: cover;
  }
`;

const Line = styled.div`
   {
    width: 96%;
    border-top: 3px dashed ${(props) => props.theme.colors.lightGray};
  }
`;

const MainSection = styled.section`
  width: 100%;

  h4 {
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 144%;
    margin: 0;

    color: ${(props) => props.theme.colors.primary};
  }
  .dark {
    margin: 48px 0 28px 0;
    color: ${(props) => props.theme.colors.darkest};
  }

  p {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: ${(props) => props.theme.colors.darkest};
  }

  div {
    padding: 0 24px 0 24px;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    table-layout: fixed;

    td {
      padding: 16px 0 0 23px;
      border: none;
    }

    td:nth-child(2) {
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 144%;
      text-align: right;
      padding: 16px 24px 0 0;
      word-wrap: break-word;

      span {
        color: ${(props) => props.theme.colors.dark};
      }
    }
  }
`;

/* comment out map for debugging purpose  */
// const MapContainer = styled.div`
//   width: 80%;
//   height: 45vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border-radius: 5px;
// `;

interface ParamTypes {
  id: string;
}

const ItemDetails: FC<ParamTypes> = () => {
  const { id } = useParams<ParamTypes>();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [item, setItem] = useState({}) as any;
  const [editItem, setEditItem] = useState(false);
  const [regive, setRegive] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const user: any = useContext(UserContext);
  const [image, setImage] = useState("") as any;
  const [itemUpdated, setItemUpdated] = useState(false);

  const fetchImage = (item: any) => {
    Storage.get(item.images[0].src).then((url: any) => {
      setImage(url);
      setItem(item);
    });
  };

  const fetchItem = async () => {
    const result = (await API.graphql(
      graphqlOperation(getAdvert, { id, version: 0 })
    )) as GraphQLResult<GetAdvertQuery>;
    const advertItem: any = result.data?.getAdvert;

    fetchImage(advertItem);
    setItem(advertItem);
  };

  const closeEditformAndFetchItem = async () => {
    await fetchItem();
    setEditItem(false);
    setRegive(false);
  };

  useEffect(() => {
    fetchItem();
    setItemUpdated(false);
  }, [itemUpdated]);

  /* comment out map for debugging purpose  */
  // useEffect(() => {
  //   const googleMapScript = loadMapApi();

  //   const cb = () => {
  //     setScriptLoaded(true);
  //   };
  //   googleMapScript.addEventListener("load", cb);

  //   return () => {
  //     googleMapScript.removeEventListener("load", cb);
  //   };
  // }, []);

  const updateItem = async (newStatus: string) => {
    const result = (await API.graphql(
      graphqlOperation(updateAdvert, {
        input: {
          id,
          status: newStatus,
          reservedBySub: user.attributes.sub,
          reservedByName: user.attributes.name,
          version: 0,
          revisions: item.revisions + 1,
        },
      })
    )) as any;

    setItemUpdated(true);

    delete item.createdAt;
    delete item.updatedAt;
    item.version = result.data.updateAdvert.revisions + 1;

    await API.graphql(graphqlOperation(createAdvert, { input: item }));
  };

  const onClickReservBtn = () => {
    updateItem("reserved");
  };

  const onClickPickUpBtn = () => {
    updateItem("pickedUp");
  };
  const translate = (word: string, cat: any) => {
    let sweWord = "";

    fieldsForm.find((el) => {
      if (el.name === cat && el.option) {
        el.option.map((op: any) => {
          if (op.eng[0] === word) {
            sweWord = op.swe[0];
          }
        });
      } else if (el.name === cat && el.swe) {
        el.eng.map((op: any, idx: number) => {
          if (op === word) {
            sweWord = el.swe[idx];
          }
        });
      }
    });
    return sweWord;
  };
  const mapingObject = (obj: any, cat: string) => {
    let str = "";
    Object.entries(obj[0]).forEach(([key, value]) => {
      if (value) {
        const sweWord = translate(key, cat);
        if (str.length === 0) {
          str = `${str} ${sweWord}`;
        } else {
          str = `${str}, ${sweWord}`;
        }
      }
    });
    return <td key={str}>{str}</td>;
  };
  let history = useHistory();

  const goBackFunc = () => {
    history.goBack();
  };

  const allDetails = (
    <>
      <TopSection>
        {item.status === "available" && (
          <header>
            <MdArrowBack onClick={goBackFunc} />
            <p className="headerTitle">{item.title}</p>
          </header>
        )}

        {(item.status === "reserved" || item.status === "pickedUp") && (
          <header className="reservedHeader">
            <MdArrowBack onClick={goBackFunc} />
            <p className="headerTitle headerTitle--reserved">{item.title}</p>
            {item.status === "reserved" ? (
              <p className="reservedP">Reserverad</p>
            ) : (
              <p className="reservedP">Uthämtad</p>
            )}
          </header>
        )}

        {!image ? (
          <Loader type="ThreeDots" color="#9db0c6" height={50} width={50} />
        ) : (
          <ImgDiv>
            <img src={image} alt="" onClick={() => setShowCarousel(true)} />
          </ImgDiv>
        )}
        <div className="titleDiv">
          <h4>Möbler</h4>
          <h1>{item.title}</h1>
        </div>

        {item.status === "available" && (
          <button
            className="haffaBtn"
            onClick={() => {
              onClickReservBtn();
            }}
            type="button"
          >
            Haffa!
          </button>
        )}

        {item.status === "reserved" &&
          item.reservedBySub === user.attributes.sub && (
            <>
              <button
                className="haffaBtn haffaBtn--pickUp"
                onClick={() => {
                  onClickPickUpBtn();
                }}
                type="button"
              >
                Hämta ut
              </button>

              <p className="removeReservationP">Ta bort reservation</p>
            </>
          )}

        {item.status === "pickedUp" &&
          item.reservedBySub === user.attributes.sub && (
            <>
              <button
                className="regiveBtn"
                onClick={() => {
                  setRegive(true);
                }}
                type="button"
              >
                Annonsera igen
              </button>
            </>
          )}
      </TopSection>

      <MainSection>
        <div>
          <h4 className="dark">Beskrivning</h4>
          <p>{item.description}</p>
        </div>
        <table>
          <tbody>
            <tr>
              <td>
                <h4>Typ av möbel</h4>
              </td>
              <td>
                {item.category
                  ? translate(item.category, "category")
                  : item.category}
              </td>
            </tr>
            <tr>
              <td>
                <h4>Höjd</h4>
              </td>
              <td>
                {item.height} <span>cm</span>
              </td>
            </tr>
            <tr>
              <td>
                <h4>Bredd</h4>
              </td>
              <td>
                {item.width} <span>cm</span>
              </td>
            </tr>
            <tr>
              <td>
                <h4>Djup</h4>
              </td>
              <td>
                {item.length} <span>cm</span>
              </td>
            </tr>

            <tr>
              <td>
                <h4>Färg</h4>
              </td>
              <td>{item.color}</td>
            </tr>
            <tr>
              <td>
                <h4>Material</h4>
              </td>
              {item.material ? (
                mapingObject(item.material, "material")
              ) : (
                <td> </td>
              )}
            </tr>
            <tr>
              <td>
                <h4>Skick</h4>
              </td>
              <td>
                {item.condition
                  ? translate(item.condition, "condition")
                  : item.condition}
              </td>
            </tr>
            <tr>
              <td>
                <h4>Användningsområde</h4>
              </td>
              {item.areaOfUse ? (
                mapingObject(item.areaOfUse, "areaOfUse")
              ) : (
                <td> </td>
              )}
            </tr>
            <tr>
              <td>
                <h4>Klimatpåverkan</h4>
              </td>
              <td>
                {item.climateImpact}{" "}
                <span>
                  kg CO<sub>2</sub>e
                </span>
              </td>
            </tr>

            {item.status === "available" && (
              <tr>
                <td>
                  <h4>Har varit tillgänglig i</h4>
                </td>
                <td>
                  {showDays(item.createdAt)} <span>dagar</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </MainSection>
      <div>
        <h4>Här finns prylen:</h4>
        <p>{item.location}</p>

        <h4>Kontaktperson:</h4>
        <p>{item.contactPerson}</p>

        <h4>Kontaktperson:</h4>
        <p>{item.phoneNumber}</p>

        <h4>Kontaktperson:</h4>
        <p>{item.email}</p>
      </div>
      {/* <MapContainer>
        {item && item.location && (
          <Map
            mapType={google.maps.MapTypeId.ROADMAP}
            mapTypeControl={false}
            location={item.location}
          />
        )}

        {!item.location && (
          <Loader type="ThreeDots" color="#9db0c6" height={50} width={50} />
        )}
      </MapContainer> */}
      {item.status === "available" && item.giver === user.attributes.sub && (
        <>
          <button onClick={() => setEditItem(true)} type="button">
            Redigera annons
          </button>
        </>
      )}
      <Line />

      <QRCode id={id} />
    </>
  );

  return (
    <main>
      {editItem ? (
        <EditItemForm
          setEditItem={setEditItem}
          item={item}
          closeEditformAndFetchItem={closeEditformAndFetchItem}
          image={image}
        />
      ) : regive ? (
        <RegiveForm
          setRegive={setRegive}
          item={item}
          closeEditformAndFetchItem={closeEditformAndFetchItem}
        />
      ) : showCarousel ? (
        <CarouselComp setShowCarousel={setShowCarousel} image={image} />
      ) : (
        allDetails
      )}
    </main>
  );
};

export default ItemDetails;
