/* eslint-disable react/button-has-type */
import React, { FC } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import QRCode from "../components/QRCodeContainer";

const ItemImg = styled.img`
  width: 300px;
  height: 300px;
  margin: 0;
`;

const DescTable = styled.table`
  border: 1px solid purple;
  width: 90%;
  margin: 0 auto;
  td {
    text-align: left;
  }
`;

const DescArticle = styled.article``;

const DescP = styled.p`
  text-align: center;
`;

interface ParamTypes {
  id: string;
}

const ItemDetails: FC<ParamTypes> = () => {
  const { id } = useParams<ParamTypes>();
  const history = useHistory();
  return (
    <main>
      <h1>Designed Table</h1>
      <ItemImg
        src="https://storage.googleapis.com/web-pro-nilo-kavehome/media/cache/c4/10/c410118add2b5cb169d71a0c20596f50.jpg"
        alt=""
      />
      <DescTable>
        <tbody>
          <tr>
            <td>Item number:</td>
            <td>{id}</td>
          </tr>
          <tr>
            <td>Measurement:</td>
            <td>20 x 30 x 10 cm</td>
          </tr>
          <tr>
            <td>Brand:</td>
            <td>IKEA</td>
          </tr>
        </tbody>
      </DescTable>
      <DescArticle>
        <DescP>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta
          asperiores nostrum quibusdam consequuntur.
        </DescP>
      </DescArticle>
      <QRCode id={id} />
      <div>
        <button onClick={() => history.goBack()}>Back</button>
        <button>Reserve</button>
      </div>
    </main>
  );
};

export default ItemDetails;
