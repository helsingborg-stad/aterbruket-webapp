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
import { UserContext } from "../contexts/UserContext";
import RegiveForm from "../components/RegiveForm";

const DivBtns = styled.div`
  display: flex;
  width: 90%;
  justify-content: center;
  flex-wrap: wrap;

  button {
    border: 2px solid green;
    outline: none;
    width: 70px;
    height: 30px;
    background-color: white;
    margin: 5px;
    border-radius: 5px;
  }
  .regiveBtn {
    width: 111px;
  }

  p {
    color: grey;
    margin: 0;
    font-style: italic;
    font-size: 0.8em;
  }
`;

const ItemImg = styled.img`
  width: 300px;
  height: 300px;
  margin: 0;
`;

const Table = styled.table`
  width: 90%;
  max-width: 500px;
  margin: 10px auto;
  border-collapse: collapse;

  td {
    text-align: left;
    padding: 10px;
    border: none;
    font-weight: 500;
  }

  td:nth-child(2) {
    width: 70%;
    border: none;
    font-weight: 400;
  }
`;

const MapContainer = styled.div`
  width: 80%;
  height: 45vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

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

  const fetchImage = (item: any) => {
    Storage.get(item.images[0].src).then((url: any) => {
      setImage(url);
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
  }, []);

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
  const updateItem = async () => {
    await API.graphql(
      graphqlOperation(updateAdvert, {
        input: {
          id,
          status: "reserved",
          reservedBySub: user.attributes.sub,
          reservedByName: user.attributes.name,
          version: 0,
        },
      })
    );

    item.version = item.revisions + 1;
    delete item.createdAt;
    delete item.updatedAt;

    await API.graphql(graphqlOperation(createAdvert, { input: item }));
  };

  const onClickReservBtn = () => {
    updateItem();
  };

  const mapingObject = (obj: any) => {
    let str = "";
    Object.entries(obj[0]).forEach(([key, value]) => {
      if (value) {
        if (str.length === 0) {
          str = `${str} ${key}`;
        } else {
          str = `${str}, ${key}`;
        }
      }
    });
    return <td key={str}>{str}</td>;
  };

  const history = useHistory();
  const allDetails = (
    <>
      <DivBtns>
        {item.status === "reserved" && (
          <p>
            (Prylen har status: &quot;{item.status}&quot;. Gjordes av:{" "}
            <span>{item.reservedByName}</span>)
          </p>
        )}
        {item.status === "available" && (
          <button
            onClick={() => {
              onClickReservBtn();
            }}
            type="button"
          >
            HAFFA
          </button>
        )}
        {item.status === "available" && item.giver === user.attributes.sub && (
          <>
            <button onClick={() => setEditItem(true)} type="button">
              Edit
            </button>
          </>
        )}
        {item.status === "reserved" &&
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
      </DivBtns>
      <h1>{item.title}</h1>
      {!image ? (
        <Loader type="ThreeDots" color="#9db0c6" height={50} width={50} />
      ) : (
        <ItemImg src={image} alt="" onClick={() => setShowCarousel(true)} />
      )}

      <Table>
        <tbody>
          <tr>
            <td>Kategori/Typ av möbel:</td>
            <td>{item.category}</td>
          </tr>
          <tr>
            <td>Id:</td>
            <td>{id}</td>
          </tr>
          <tr>
            <td>Höjd:</td>
            <td>{item.height} cm</td>
          </tr>
          <tr>
            <td>Bredd:</td>
            <td>{item.width} cm</td>
          </tr>
          <tr>
            <td>Djup:</td>
            <td>{item.length} cm</td>
          </tr>
          <tr>
            <td>Färg:</td>
            <td>{item.color}</td>
          </tr>

          <tr>
            <td>Material:</td>
            {item.material ? mapingObject(item.material) : <td> </td>}
          </tr>
          <tr>
            <td>Skick:</td>
            <td>{item.condition}</td>
          </tr>
          <tr>
            <td>Användningsområde:</td>
            {item.areaOfUse ? mapingObject(item.areaOfUse) : <td> </td>}
          </tr>
          <tr>
            <td>Klimatpåverkan:</td>
            <td>{item.climateImpact}</td>
          </tr>
          <tr>
            <td>Beskrivning:</td>
            <td>{item.description}</td>
          </tr>
          <tr>
            <td>Hämtas på:</td>
            <td>{item.location}</td>
          </tr>
        </tbody>
      </Table>
      <MapContainer>
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
      </MapContainer>

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
        />
      ) : regive ? (
        <RegiveForm
          setRegive={setRegive}
          item={item}
          closeEditformAndFetchItem={closeEditformAndFetchItem}
        />
      ) : showCarousel ? (
        <CarouselComp setShowCarousel={setShowCarousel} />
      ) : (
        allDetails
      )}
    </main>
  );
};

export default ItemDetails;
