import API, { GraphQLResult } from "@aws-amplify/api";
import { graphqlOperation } from "aws-amplify";
import React, { FC, useContext, useEffect, useState, useCallback } from "react";
import AdvertContainer from "./AdvertContainer";
import { ListAdvertsQuery } from "../API";
import { listAdverts } from "../graphql/queries";
import { UserContext } from "../contexts/UserContext";

const MyAdverts: FC = () => {
  const user: any = useContext(UserContext);
  const [adverts, setAdverts] = useState([{}]) as any;

  const fetchCreatedAdverts = useCallback(async () => {
    const result = (await API.graphql(
      graphqlOperation(listAdverts, {
        filter: {
          and: [{ giver: { eq: user.attributes.sub } }, { version: { eq: 0 } }],
        },
      })
    )) as GraphQLResult<ListAdvertsQuery>;

    const advertItem = result.data?.listAdverts?.items;
    setAdverts(advertItem);
  }, [user.attributes.sub]);

  useEffect(() => {
    if (user.attributes.sub) {
      fetchCreatedAdverts();
    }
  }, [user]);
  return (
    <main style={{ marginTop: "60px" }}>
      <AdvertContainer
        items={adverts}
        searchValue={false}
        itemsFrom="profile"
      />
    </main>
  );
};

export default MyAdverts;
