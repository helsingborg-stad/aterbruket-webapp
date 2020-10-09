/* eslint-disable react/button-has-type */
import React, { FC } from "react";
import { useParams } from "react-router-dom";

interface ParamTypes {
  id: string;
}

const ItemDetails: FC<ParamTypes> = () => {
  const { id } = useParams<ParamTypes>();

  return (
    <main>
      <h1>Designed Table</h1>
      <img src="" alt="" />
      <ul>
        <li>Item id:{id} </li>
        <li>Measurement: 20x10x10</li>
        <li>Material: Wood</li>
        <li>Brand: Ikea</li>
      </ul>
      <article>Description</article>
      <div>
        <button>Back</button>
        <button>Reserve</button>
      </div>
    </main>
  );
};

export default ItemDetails;
