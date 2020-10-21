/* eslint-disable react/button-has-type */
import React, { FC, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";
import QRCode from "../components/QRCodeContainer";
import { GetAdvertisementQuery } from "../API";
import { getAdvertisement } from "../graphql/queries";

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

interface ParamTypes {
  id: string;
}

const ItemDetails: FC<ParamTypes> = () => {
  const { id } = useParams<ParamTypes>();
  const [item, setItem] = useState({}) as any;

  const fetchItem = async () => {
    const result = (await API.graphql(
      graphqlOperation(getAdvertisement, { id: id })
    )) as GraphQLResult<GetAdvertisementQuery>;
    const advertItem = result.data?.getAdvertisement;

    setItem(advertItem);
  };
  useEffect(() => {
    fetchItem();
  }, []);

  const onClickReservBtn = () => {
    console.log("reserv btn clicked");
    console.log("status", item.status);
  };

  const history = useHistory();
  return (
    <main>
      <br />
      <div>
        <button
          onClick={() => {
            onClickReservBtn();
          }}
        >
          HAFFA
        </button>
        <button onClick={() => history.goBack()}>Tillbaka</button>
      </div>

      <h1>{item.title}</h1>
      <ItemImg
        src="https://storage.googleapis.com/web-pro-nilo-kavehome/media/cache/c4/10/c410118add2b5cb169d71a0c20596f50.jpg"
        alt=""
      />
      <Table>
        <tbody>
          <tr>
            <td>Category:</td>
            <td>Table</td>
          </tr>
          <tr>
            <td>Id:</td>
            <td>{id}</td>
          </tr>
          <tr>
            <td>Height(cm):</td>
            <td>200</td>
          </tr>
          <tr>
            <td>Width (cm):</td>
            <td>{item.width}</td>
          </tr>
          <tr>
            <td>Depth (cm):</td>
            <td>50</td>
          </tr>
          <tr>
            <td>Color:</td>
            <td>Grey</td>
          </tr>

          <tr>
            <td>Material:</td>
            <td>Wood</td>
          </tr>
          <tr>
            <td>Item Condition:</td>
            <td>Good</td>
          </tr>
          <tr>
            <td>Areas of Usage:</td>
            <td>Indoor office</td>
          </tr>
          <tr>
            <td>LCA Value:</td>
            <td>50</td>
          </tr>
          <tr>
            <td>Pickup Address:</td>
            <td>Drottningsgatan 10, Helsingborg</td>
          </tr>
          <tr>
            <td>{/*geo tag*/}</td>
          </tr>
          <tr>
            <td>Description:</td>
            <td>{item.description}</td>
          </tr>
        </tbody>
      </Table>
      <div>
        <QRCode id={id} />
      </div>
    </main>
  );
};

export default ItemDetails;
