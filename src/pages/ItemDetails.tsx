/* eslint-disable react/button-has-type */
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const MainDiv = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;
const DescList = styled.ul`
  list-style: none;
`;

const ItemImg = styled.img`
  width: 300px;
  height: 300px;
  margin: 0 auto;
`;

interface ParamTypes {
  id: string;
}

const ItemDetails: FC<ParamTypes> = () => {
  const { id } = useParams<ParamTypes>();

  return (
    <MainDiv>
      <h1>Designed Table</h1>
      <ItemImg
        src="https://storage.googleapis.com/web-pro-nilo-kavehome/media/cache/c4/10/c410118add2b5cb169d71a0c20596f50.jpg"
        alt=""
      />
      <DescList>
        <li>Item id:{id} </li>
        <li>Measurement: 20x10x10</li>
        <li>Material: Wood</li>
        <li>Brand: Ikea</li>
      </DescList>
      <article>Description</article>
      <div>
        <button>Back</button>
        <button>Reserve</button>
      </div>
    </MainDiv>
  );
};

export default ItemDetails;
