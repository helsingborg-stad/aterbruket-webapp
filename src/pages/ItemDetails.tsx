import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

interface ParamTypes {
  id: string;
}

const ItemDetails: FC<ParamTypes> = () => {
  const { id } = useParams<ParamTypes>();

  return <h1>Details about item with id: {id}</h1>;
};

export default ItemDetails;
