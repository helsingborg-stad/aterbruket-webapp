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
  margin-bottom: 120px;

  .allaDiv {
    width: 100%;
    display: flex;
    align-items: flex-start;
    h3 {
      color: #3d3d3d;
      margin: 10px;
    }
  }
`;

const AdvertContainer: FC = () => {
  const [items, setItems] = useState([]) as any;

  const fetchItems = async () => {
    const result = (await API.graphql(
      graphqlOperation(listAdvertisements)
    )) as GraphQLResult<ListAdvertisementsQuery>;
    const advertItems = result.data?.listAdvertisements?.items;

    setItems(advertItems);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <AdvertContainerDiv>
      <div className="allaDiv">
        <h3>Alla</h3>
      </div>
      {items.map((item: any) =>
        item.status === "available" ||
        item.status === "reserved" ||
        item.status === null ? (
          <Card
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            status={item.status}
          />
        ) : null
      )}
    </AdvertContainerDiv>
  );
};
export default AdvertContainer;
