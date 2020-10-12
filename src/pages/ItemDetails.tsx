/* eslint-disable react/button-has-type */
import React, { FC } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";

const MainDiv = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;

const ItemImg = styled.img`
  width: 300px;
  height: 300px;
  margin: 0 auto;
`;

const DescTable = styled.table`
  border: 1px solid purple;
  width: 500px;
  margin: 0 auto;
`;

const DescTbody = styled.tbody``;

const DescTd = styled.td`
  text-align: left;
`;

const DescTr = styled.tr``;

const DescArticle = styled.article``;

const DescP = styled.p``;

interface ParamTypes {
  id: string;
}

const ItemDetails: FC<ParamTypes> = () => {
  const { id } = useParams<ParamTypes>();
  let history = useHistory();
  return (
    <main>
      <h1>Designed Table</h1>
      <ItemImg
        src="https://storage.googleapis.com/web-pro-nilo-kavehome/media/cache/c4/10/c410118add2b5cb169d71a0c20596f50.jpg"
        alt=""
      />
      <DescTable>
        <DescTbody>
          <DescTr>
            <DescTd>Item number:</DescTd>
            <DescTd>{id}</DescTd>
          </DescTr>
          <DescTr>
            <DescTd>Measurement:</DescTd>
            <DescTd>20 x 30 x 10 cm</DescTd>
          </DescTr>
          <DescTr>
            <DescTd>Brand:</DescTd>
            <DescTd>IKEA</DescTd>
          </DescTr>
        </DescTbody>
      </DescTable>
      <DescArticle>
        <DescP>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta
          asperiores nostrum quibusdam consequuntur.
        </DescP>
      </DescArticle>
      <div>
        <button onClick={() => history.goBack()}>Back</button>
        <button>Reserve</button>
      </div>
    </main>
  );
};

export default ItemDetails;
