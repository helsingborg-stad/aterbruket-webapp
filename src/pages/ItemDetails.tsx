/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/button-has-type */
import React, { FC, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";

import styled from "styled-components";
import { graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";
import QRCode from "../components/QRCodeContainer";
import { GetAdvertisementQuery } from "../API";
import { getAdvertisement } from "../graphql/queries";
import { updateAdvertisement } from "../graphql/mutations";
import EditItemForm from "../components/EditItemForm";
import { loadMapApi } from "../utils/GoogleMapsUtils";
import Map from "../components/Map";
import CarouselComp from "../components/CarouselComp";

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

const QRContainer = styled.div`
  margin-bottom: 47px;
`;

interface ParamTypes {
  id: string;
}

const ItemDetails: FC<ParamTypes> = () => {
  const { id } = useParams<ParamTypes>();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [item, setItem] = useState({}) as any;
  const [reservedClicked, setReservedClicked] = useState(false);
  const [editItem, setEditItem] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);

  const fetchItem = async () => {
    const result = (await API.graphql(
      graphqlOperation(getAdvertisement, { id })
    )) as GraphQLResult<GetAdvertisementQuery>;
    const advertItem = result.data?.getAdvertisement;
    setItem(advertItem);
  };

  const closeEditformAndFetchItem = async () => {
    await fetchItem();
    setEditItem(false);
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
    const result: any = await API.graphql(
      graphqlOperation(updateAdvertisement, {
        input: {
          id,
          status: "reserved",
        },
      })
    );

    const advertItem = result.data?.updateAdvertisement;
    setItem(advertItem);
  };

  const onClickReservBtn = () => {
    updateItem();
    setReservedClicked(true);
  };

  const history = useHistory();
  const allDetails = (
    <>
      <DivBtns>
        <button onClick={() => setEditItem(true)}>Edit</button>
        <button onClick={() => history.goBack()}>Tillbaka</button>
        {item.status === "available" || item.status === null ? (
          <button
            onClick={() => {
              onClickReservBtn();
            }}
          >
            HAFFA
          </button>
        ) : (
          <p>
            (Prylen har status: &quot;{item.status}&quot;. Gjordes av: [NAMN])
          </p>
        )}
      </DivBtns>
      {reservedClicked && (
        <p>
          Du har haffat {item.title} statusen är: {item.status}
        </p>
      )}
      <h1>{item.title}</h1>
      <ItemImg
        src="https://storage.googleapis.com/web-pro-nilo-kavehome/media/cache/c4/10/c410118add2b5cb169d71a0c20596f50.jpg"
        alt=""
        onClick={() => setShowCarousel(true)}
      />
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
            <td>{item.material}</td>
          </tr>
          <tr>
            <td>Skick:</td>
            <td>{item.condition}</td>
          </tr>
          <tr>
            <td>Användningsområde:</td>
            <td>{item.areaOfUse}</td>
          </tr>
          <tr>
            <td>Klimatpåverkan:</td>
            <td>50</td>
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
      <QRContainer>
        <QRCode id={id} />
      </QRContainer>
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
      ) : showCarousel ? (
        <CarouselComp setShowCarousel={setShowCarousel} />
      ) : (
        allDetails
      )}
    </main>
  );
};

export default ItemDetails;
