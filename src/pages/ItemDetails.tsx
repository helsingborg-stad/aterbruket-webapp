/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-named-as-default-member */

import React, { FC, useState, useEffect, useContext } from "react";
import ReactDOM, { useParams, useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import { graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";
import QRCode from "../components/QRCodeContainer";
import { GetAdvertQuery } from "../API";
import { getAdvert } from "../graphql/queries";
import { createAdvert, updateAdvert, updateAdvertisement } from "../graphql/mutations";
import EditItemForm from "../components/EditItemForm";
import { loadMapApi } from "../utils/GoogleMapsUtils";
import Map from "../components/Map";
import CarouselComp from "../components/CarouselComp";
import { UserContext } from "../contexts/UserContext";

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

interface ParamTypes {
  id: string;
}

const ItemDetails: FC<ParamTypes> = () => {
  const { id } = useParams<ParamTypes>();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [item, setItem] = useState({}) as any;
  const [editItem, setEditItem] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const user: any = useContext(UserContext);

  const fetchItem = async () => {
    const result = (await API.graphql(
      graphqlOperation(getAdvert, { id, version: 0})
    )) as GraphQLResult<GetAdvertQuery>;
    const advertItem = result.data?.getAdvert;
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
      graphqlOperation(updateAdvert, {
        input: {
          id,
          status: "reserved",
          reservedBy: user.attributes.sub,
          version: 0
        },
      })
    );
    
    item.version = item.revisions + 1
    delete item.createdAt;
    delete item.updatedAt;
    console.log(item)
    await API.graphql(
      graphqlOperation(createAdvert, { input: item })
    );

    const advertItem = result.data?.updateAdvert;
    setItem(advertItem);
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
        <button onClick={() => setEditItem(true)} type="button">
          Edit
        </button>

        {item.status === "available" || item.status === null ? (
          <button
            onClick={() => {
              onClickReservBtn();
            }}
            type="button"
          >
            HAFFA
          </button>
        ) : (
          <p>
            (Prylen har status: &quot;{item.status}&quot;. Gjordes av:{" "}
            {user.attributes.name})
          </p>
        )}
      </DivBtns>
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
      ) : showCarousel ? (
        <CarouselComp setShowCarousel={setShowCarousel} />
      ) : (
        allDetails
      )}
    </main>
  );
};

export default ItemDetails;
