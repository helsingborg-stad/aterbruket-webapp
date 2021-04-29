/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable-next-line react-hooks/exhaustive-deps */
/* global google */

import React, { FC, useState, useEffect, useContext, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import { graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import { API, Storage } from "aws-amplify";
import {
  MdArrowBack,
  MdEdit,
  MdPlace,
  MdPerson,
  MdPhone,
} from "react-icons/md";
import { FiAtSign } from "react-icons/fi";
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
    height: 75px;
    position: fixed;
    background-color: ${(props) => props.theme.colors.offWhite};
    z-index: 1000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

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
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 132%;
      color: ${(props) => props.theme.colors.darkest};
      max-width: 30%;
    }
    .btn--haffa--header,
    .btn--pickUp--header {
      width: auto;
      height: auto;
      margin: 0;
      position: absolute;
      bottom: 7px;
      right: 16px;
      padding: 8px 12px;
      font-size: 16px;
      box-shadow: none;
    }

    .btn--pickUp--header {
      background-color: ${(props) => props.theme.colors.primaryLight};
    }
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
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 112%;
      letter-spacing: 0.0025em;
      color: ${(props) => props.theme.colors.primaryDark};
    }
    h1 {
      font-style: normal;
      font-weight: 900;
      font-size: 36px;
      line-height: 124%;
      margin: 8px 32px 24px 32px;
    }
  }

  .removeReservation {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: ${(props) => props.theme.colors.dark};
    margin: 0 0 32px 0;
    border: none;
    outline: none;
    background-color: transparent;
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
  .description {
    box-sizing: border-box;
    margin: 0 24px;
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
    width: 90%;
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
    margin: 24px 0px 12px 0px;
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
    width: 90%;
    min-width: 334px;
    height: 48px;
    background-color: #f5f5f5;
    border-radius: 4.5px;
    margin: 0 0 10px 0;
    line-break: anywhere;

    a {
      color: ${(props) => props.theme.colors.darker};
      margin-left: 8px;
      text-decoration: inherit;
      color: inherit;
      :visited {
        text-decoration: inherit;
        color: inherit;
      }
    }
    svg {
      font-size: 20px;
      color: ${(props) => props.theme.colors.dark};
    }
  }
`;

interface ParamTypes {
  id: string;
}

const ItemDetails: FC<ParamTypes> = () => {
  const { id } = useParams<ParamTypes>();
  const [item, setItem] = useState({}) as any;
  const [editItem, setEditItem] = useState(false);
  const [regive, setRegive] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const { user } = useContext(UserContext);
  const [image, setImage] = useState("") as any;
  const [itemUpdated, setItemUpdated] = useState(false);
  const buttonOutOfScreen = useRef(null);
  const [refVisible, setRefVisible] = useState(false);
  const [showHeaderBtn, setShowHeaderBtn] = useState(false);

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

  let handler: any;
  const scrollFunc = () => {
    handler = function () {
      const element: any = buttonOutOfScreen.current;

      const buttonPos: any = element.offsetTop - element.offsetHeight;

      if (window.scrollY >= buttonPos) {
        setShowHeaderBtn(true);
      } else {
        setShowHeaderBtn(false);
      }
    };

    window.addEventListener("scroll", handler, false);
  };
  useEffect(() => {
    if (!refVisible) {
      return;
    }

    scrollFunc();
    return () => {
      window.removeEventListener("scroll", handler, false);
    };
  });

  useEffect(() => {
    loadMapApi();
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
    setShowHeaderBtn(false);
  };
  const onClickRemoveResBtn = () => {
    updateItem("available");
    setShowHeaderBtn(false);
  };
  const onClickPickUpBtn = () => {
    updateItem("pickedUp");
    setShowHeaderBtn(false);
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
  const history = useHistory();

  const goBackFunc = () => {
    history.goBack();
  };

  const mailtoHref = `mailto:${item.email}?subject=Email från Haffa`;
  const telHref = `tel:${item.phoneNumber}`;

  const allDetails = (
    <>
      <TopSection>
        {item.status === "available" && (
          <header className="header">
            <MdArrowBack onClick={goBackFunc} />
            <p className="headerTitle">{item.title}</p>
            {showHeaderBtn && (
              <Button
                className="btn--haffa--header"
                onClick={() => {
                  onClickReservBtn();
                }}
                type="button"
              >
                HAFFA!
              </Button>
            )}
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
            {showHeaderBtn && (
              <Button
                className="btn--pickUp--header"
                onClick={() => {
                  onClickPickUpBtn();
                }}
                type="button"
              >
                HÄMTA UT
              </Button>
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
          <h4>
            {item.category
              ? translate(item.category, "category")
              : item.category}
          </h4>
          <h1>{item.title}</h1>
        </div>

        {item.status ===
          "available" /* && item.giver !== user.attributes.sub */ && (
          <Button
            ref={(el: any) => {
              buttonOutOfScreen.current = el;
              setRefVisible(!!el);
            }}
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
              ref={(el: any) => {
                buttonOutOfScreen.current = el;
                setRefVisible(!!el);
              }}
              className=" btn--pickUp"
              onClick={() => {
                onClickPickUpBtn();
              }}
              type="button"
            >
              Hämta ut
            </Button>
            <button
              type="button"
              className="removeReservation"
              onClick={() => {
                onClickRemoveResBtn();
              }}
            >
              Ta bort reservation
            </button>
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
          <p className="description">{item.description}</p>
        </div>
        <table>
          <tbody>
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
              {item && item.location && (
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
            {item.phoneNumber && (
              <div className="contactInfo">
                <MdPhone />
                <a href={telHref}>{item.phoneNumber}</a>
              </div>
            )}

            <div className="contactInfo">
              <FiAtSign />
              <a href={mailtoHref}>{item.email}</a>
            </div>
          </div>
        </CardGroups>
      </MainSection>

      <Line />

      <QRCode id={id} />
    </>
  );

  return (
    <main style={{ padding: 0 }}>
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
