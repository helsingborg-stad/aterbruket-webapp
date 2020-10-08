import { GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";
import React, { FC, useEffect, useState } from "react";
import { ListAdvertisementsQuery } from "../API";
import { listAdvertisements } from "../graphql/queries";
import Card from "./Card";

const AdvertContainer = () => {
  const [items, setItems] = useState([]) as any;

  const fetchItems = async () => {
    const result = (await API.graphql({
      query: listAdvertisements,
    })) as GraphQLResult<ListAdvertisementsQuery>;
    const advertItems = result.data?.listAdvertisements?.items;

    setItems(advertItems);
  };

  useEffect(() => {
    fetchItems();
  });

  return (
    <ul>
      {items.map((item: any) => (
        <Card title={item.title} description={item.description} />
      ))}
    </ul>
  );
};
export default AdvertContainer;
