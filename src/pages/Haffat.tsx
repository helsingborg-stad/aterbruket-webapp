import API, { GraphQLResult } from "@aws-amplify/api";
import { graphqlOperation } from "aws-amplify";
import React, { useContext, useEffect, useState, useCallback, FC } from "react";
import styled from "styled-components";
import AdvertContainer from "../components/AdvertContainer";
import { ListAdvertsQuery } from "../API";
import { listAdverts } from "../graphql/queries";
import { UserContext } from "../contexts/UserContext";

const Haffat: FC = () => {
  const user: any = useContext(UserContext);
  const [reservedItems, setReservedItems] = useState([{}]) as any;

  const fetchReservedAdverts = useCallback(async () => {
    const result = (await API.graphql(
      graphqlOperation(listAdverts, {
        filter: {
          and: [
            { reservedBySub: { eq: user.attributes.sub } },
            { version: { eq: 0 } },
          ],
        },
      })
    )) as GraphQLResult<ListAdvertsQuery>;
    const advertItem = result.data?.listAdverts?.items;
    setReservedItems(advertItem);
  }, [user.attributes.sub]);

  useEffect(() => {
    if (user.attributes.sub) {
      fetchReservedAdverts();
    }
  }, [fetchReservedAdverts, user]);

  return (
    <main style={{ marginTop: "60px" }}>
      <AdvertContainer
        searchValue={false}
        items={reservedItems}
        itemsFrom="haffat"
      />
    </main>
  );
};

export default Haffat;
