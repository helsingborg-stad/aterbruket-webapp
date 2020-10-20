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
  margin: 10px auto;
  td {
    text-align: left;
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

  console.log("QR * ", id);

  const history = useHistory();
  return (
    <main>
      <h1>{item.title}</h1>
      <ItemImg
        src="https://storage.googleapis.com/web-pro-nilo-kavehome/media/cache/c4/10/c410118add2b5cb169d71a0c20596f50.jpg"
        alt=""
      />
      <Table>
        <tbody>
          <tr>
            <td>Id number:</td>
            <td>{id}</td>
          </tr>
          <tr>
            <td>Measurement</td>
            <td>20 x 30 x 10 cm</td>
          </tr>
          <tr>
            <td>Brand:</td>
            <td>IKEA</td>
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
      <div>
        <button onClick={() => history.goBack()}>Back</button>
        <button>Reserve</button>
      </div>
    </main>
  );
};

export default ItemDetails;
