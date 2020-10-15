/* eslint-disable react/button-has-type */
import React, { FC, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import QRCode from "../components/QRCodeContainer";
import { graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";
import { GetAdvertisementQuery } from "../API";
import { getAdvertisement } from "../graphql/queries";

const ItemImg = styled.img`
  width: 300px;
  height: 300px;
  margin: 0;
`;

const Table = styled.table`
  border: 1px solid purple;
  width: 90%;
  margin: 0 auto;
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
        </tbody>
<<<<<<< HEAD
      </DescTable>
      <DescArticle>
        <DescP>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta
          asperiores nostrum quibusdam consequuntur.
        </DescP>
      </DescArticle>
      <QRCode id={id} />
=======
      </Table>
      <div>
        <p>
          <strong>Description</strong>
        </p>
        <p>{item.description}</p>
      </div>
>>>>>>> 5cbd73cb17d0d50e69dccd008429bc8b1f97e65d
      <div>
        <button onClick={() => history.goBack()}>Back</button>
        <button>Reserve</button>
      </div>
    </main>
  );
};

export default ItemDetails;
