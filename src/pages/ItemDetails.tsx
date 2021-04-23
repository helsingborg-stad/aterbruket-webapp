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
import { loadMapApi } from "../utils/GoogleMapsUtils";
import Map from "../components/Map";
import CarouselComp from "../components/CarouselComp";
import UserContext from "../contexts/UserContext";
import RegiveForm from "../components/RegiveForm";
import showDays from "../hooks/showDays";
import { fieldsForm } from "../utils/formUtils";
import {
  MdArrowBack,
  MdEdit,
  MdPlace,
  MdPerson,
  MdPhone,
} from "react-icons/md";
import { FiAtSign } from "react-icons/fi";

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
    z-index: 1000;
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

  .btn {
  }

  .btn--pickUp {
    background-color: ${(props) => props.theme.colors.primaryLight};
  }

  .btn--edit {
    background-color: ${(props) => props.theme.colors.primaryLighter};
    border: 2px solid #6f9725;
    box-sizing: border-box;
    border-radius: 4.5px;
    color: ${(props) => props.theme.colors.darkest};
    position: relative;

    svg {
      color: #6f9725;
      position: absolute;
      left: 115px;
      top: 16px;
    }
  }
  span {
    font-style: italic;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: ${(props) => props.theme.colors.dark};
    margin: 0 102px 24px 24px;
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
      margin: 48px 32px 24px 32px;
    }
  }

  .removeReservationP {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: ${(props) => props.theme.colors.dark};
    margin: 0 0 32px 0;
  }

  .regiveBtn {
    width: 111px;
  }
`;

const Button = styled.button`
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
  margin: 0 auto;

  h4 {
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 144%;
    margin: 0;

    color: ${(props) => props.theme.colors.primary};
  }
  .dark {
    margin: 48px 0 28px 24px;
    color: ${(props) => props.theme.colors.darkest};
    align-self: flex-start;
  }

  p {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: ${(props) => props.theme.colors.darkest};
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

const CardGroups = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    width: 382px;
    height: 326px;

    background-color: ${(props) => props.theme.colors.white};
    border-radius: 9.5px;
    filter: drop-shadow(0px 0px 2px rgba(98, 98, 98, 0.18)),
      drop-shadow(0px 1px 2px rgba(98, 98, 98, 0.18));
  }
  .contactCard {
    height: auto;
  }

  .cardHeader {
    z-index: 0;
    width: 100%;
    height: 30%;
    display: flex;

    justify-content: center;
    align-items: center;
    border-radius: 9.5px 9.5px 0px 0px;
  }
  .cardBody {
    box-sizing: border-box;
    margin: 0 24px;
    padding: 0 24px;
    width: 100%;
    height: 70%;
    border-radius: 0px 0px 9.5px 9.5px;
  }
  h5 {
    font-weight: 900;
    font-size: 12px;
    line-height: 150%;
    color: ${(props) => props.theme.colors.primary};
    margin: 24px ​0px 12px 0px;
  }
  p {
    margin: 0;
  }
  .btn--adress {
    margin: 16px 0;
    width: 100%;
    text-align: left;
    padding: 16px;
    // background-color: ${(props) => props.theme.colors.lightGray};
    //color: ${(props) => props.theme.colors.offWhite};
    background-color: ${(props) => props.theme.colors.primaryLighter};
    color: ${(props) => props.theme.colors.primaryDark};
    position: relative;
    opacity: 0.2; // remove this when function is working
    outline: none;

    svg {
      color: ${(props) => props.theme.colors.secondaryDark};
      position: absolute;
      top: 17px;
      right: 14px;
    }
  }

  .contactPersonDiv {
    box-sizing: border-box;
    padding: 0 24px;
    width: 100%;
    display: flex;
    margin: 16px 0;
    align-items: center;

    h4 {
      margin: 0 16px;
      align-self: unset;
    }
    div {
      padding: 0;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background-color: #f2f6ee;
      position: relative;
    }
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: ${(props) => props.theme.colors.illustration};
      font-size: 24px;
    }
  }
  .contactInfo {
    box-sizing: border-box;
    padding: 0 8px 0 8px;
    display: flex;
    align-items: center;
    width: 334px;
    height: 48px;
    background-color: #f5f5f5;
    border-radius: 4.5px;
    margin: 0 0 10px 0;
    line-break: anywhere;

    p {
      color: ${(props) => props.theme.colors.darker};
      margin-left: 8px;
    }
    svg {
      font-size: 20px;
      color: ${(props) => props.theme.colors.dark};
    }
  }
`;

/* comment out map for debugging purpose  */
// const MapContainer = styled.div`
//   width: 99%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border-radius: 9.5px 9.5px 0 0;
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
  const { user } = useContext(UserContext);
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
  useEffect(() => {
    const googleMapScript = loadMapApi();

    const cb = () => {
      setScriptLoaded(true);
    };
    googleMapScript.addEventListener("load", cb);

    return () => {
      googleMapScript.removeEventListener("load", cb);
    };
  }, []);

  const updateItem = async (newStatus: string) => {
    const result = (await API.graphql(
      graphqlOperation(updateAdvert, {
        input: {
          id,
          status: newStatus,
          reservedBySub: user.sub,
          reservedByName: user.name,
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
          <header className="header">
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
          {/*           <h4>Möbler</h4>
           */}
          <h1>{item.title}</h1>
        </div>

        {item.status ===
          "available" /* && item.giver !== user.attributes.sub */ && (
          <Button
            className="btn--haffa"
            onClick={() => {
              onClickReservBtn();
            }}
            type="button"
          >
            Haffa!
          </Button>
        )}

        {item.status === "reserved" && item.reservedBySub === user.sub && (
          <>
            <Button
              className=" btn--pickUp"
              onClick={() => {
                onClickPickUpBtn();
              }}
              type="button"
            >
              Hämta ut
            </Button>

            <p className="removeReservationP">Ta bort reservation</p>
          </>
        )}

        {item.status === "available" && item.giver === user.sub && (
          <>
            <Button
              className=" btn--edit"
              onClick={() => setEditItem(true)}
              type="button"
            >
              <MdEdit />
              Ändra
            </Button>
            <span>Den här annonsen har du lagt upp.</span>
          </>
        )}

        {item.status === "pickedUp" && item.reservedBySub === user.sub && (
          <>
            <Button
              className=" btn--regive"
              onClick={() => {
                setRegive(true);
              }}
              type="button"
            >
              Annonsera igen
            </Button>
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
        <CardGroups>
          <h4 className="dark">Här finns prylen</h4>

          <div className="card mapCard">
            <div className="cardHeader">
              {/* <MapContainer> */}
              {item && item.location && scriptLoaded && (
                <Map
                  mapType={google.maps.MapTypeId.ROADMAP}
                  mapTypeControl={false}
                  location={item.location}
                />
              )}

              {!item.location && (
                <Loader
                  type="ThreeDots"
                  color="#9db0c6"
                  height={50}
                  width={50}
                />
              )}
              {/* </MapContainer> */}
            </div>
            <div className="cardBody">
              <h5>ADRESS</h5>
              <p>{item.department}</p>
              <p>{item.location}</p>
              <Button className=" btn--adress" type="button">
                Hitta hit
                <MdPlace />
              </Button>
            </div>
          </div>
          <h4 className="dark">Kontaktperson</h4>

          <div className="card contactCard">
            <div className="contactPersonDiv">
              <div>
                <MdPerson />
              </div>
              <h4 className="dark">{item.contactPerson}</h4>
            </div>

            <div className="contactInfo">
              <MdPhone />
              <p>{item.phoneNumber}</p>
            </div>
            <div className="contactInfo">
              <FiAtSign />
              <p>{item.email}</p>
            </div>
          </div>
        </CardGroups>
      </MainSection>

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
