import React, { FC, useEffect, useState } from "react";
import { graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";
import styled from "styled-components";
import { ListAdvertisementsQuery } from "../API";
import { listAdvertisements } from "../graphql/queries";
import Card from "./Card";

const AdvertContainerDiv = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const AdvertContainer: FC = () => {
  const [items, setItems] = useState([]) as any;

  const fetchItems = async () => {
    const result = (await API.graphql(
      graphqlOperation(listAdvertisements)
    )) as GraphQLResult<ListAdvertisementsQuery>;
    const advertItems = result.data?.listAdvertisements?.items;
    console.log(advertItems);
    setItems(advertItems);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <AdvertContainerDiv>
      {items.map((item: any) =>
        item.status === "available" ? (
          <Card
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            width={item.width}
          />
        ) : null
      )}
    </AdvertContainerDiv>
  );
};
export default AdvertContainer;
