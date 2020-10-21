/* eslint-disable react/button-has-type */
import React, { FC, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";
import QRCode from "../components/QRCodeContainer";
import { GetAdvertisementQuery } from "../API";
import { getAdvertisement } from "../graphql/queries";

import Form from "../components/Form";
import useForm from "../hooks/useForm";
import { createAdvertisement } from "../graphql/mutations";

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

const fields = [
  {
    name: "title",
    dataType: "text",
    fieldType: "input"
  },
  {
    name: "length",
    dataType: "number",
    fieldType: "input"
  },
  {
    name: "description",
    fieldType: "textarea"
  }
];

const ItemDetails: FC<ParamTypes> = () => {
  const { id } = useParams<ParamTypes>();
  const [item, setItem] = useState({}) as any;
  const [editItem, setEditItem] = useState(false);
  const { values, handleInputChange, handleSubmit, redirect } = useForm(
    { title: "", description: "", length: 0 },
    createAdvertisement
  );

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
      {editItem ? (
        <>
          <button onClick={() => setEditItem(false)}>X</button>
          <Form
            values={values}
            fields={fields}
            mutation={createAdvertisement}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </>
      ) : (
        <>
          <button onClick={() => setEditItem(true)}>Edit</button>
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
          <div>
            <button onClick={() => history.goBack()}>Back</button>
            <button>Reserve</button>
          </div>
        </>
      )}
    </main>
  );
};

export default ItemDetails;
