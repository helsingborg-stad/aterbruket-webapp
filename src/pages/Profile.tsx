import API, { GraphQLResult } from "@aws-amplify/api";
import { graphqlOperation } from "aws-amplify";
import React, { useContext, useEffect, useState, useCallback, FC } from "react";
import styled from "styled-components";
import { ListAdvertsQuery } from "../API";
import AdvertContainer from "../components/AdvertContainer";
import { listAdverts } from "../graphql/queries";
import { UserContext } from "../contexts/UserContext";

const InformationFrame = styled.header`
  padding: 24px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)),
    #ffffff;
  border-radius: 4.5px;
`;

const InformationHeader = styled.p`
  text-transform: uppercase;
  color: #0069b4;
`;

const InformationContainer = styled.div`
  width: 90%;
  height: 100vh;
  background: #fcfcfc;
`;

const Profile: FC = () => {
  const user: any = useContext(UserContext);
  const [adverts, setAdverts] = useState([{}]) as any;

  // Fetch and replace placeholder

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
  }, [fetchCreatedAdverts, user]);

  const userKeys = Object.keys(user.attributes);
  const userInfo = userKeys.map((key) => {
    return (
      <div key={key}>
        <InformationHeader>{key}</InformationHeader>
        <InformationFrame>{user.attributes[key]}</InformationFrame>
      </div>
    );
  });

  return (
    <main>
      <h1> {user.attributes.name} </h1>
      <InformationContainer>
        <h3> Kontakt </h3>
        {userInfo}
        <AdvertContainer
          searchValue={false}
          items={adverts}
          itemsFrom="profile"
        />
      </InformationContainer>
    </main>
  );
};

export default Profile;
