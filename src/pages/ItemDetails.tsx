import React, { FC } from "react";
import { useParams } from "react-router-dom";

interface ParamTypes {
  id: string;
}

const ItemDetails: FC<ParamTypes> = () => {
  const { id } = useParams<ParamTypes>();

  return <main>Details about item with id: {id}</main>;
};

export default ItemDetails;
