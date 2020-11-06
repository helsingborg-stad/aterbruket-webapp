import API, { GraphQLResult } from "@aws-amplify/api";
import { graphqlOperation } from "aws-amplify";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ListAdvertisementsQuery } from "../API";
import AdvertContainer from "../components/AdvertContainer";
import { listAdvertisements } from "../graphql/queries";
import { UserContext } from "../contexts/UserContext";

export default function Profile() {
  const user: any = useContext(UserContext);
  const [adverts, setAdverts] = useState([{}]) as any;
       
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
    width: 100vw;
    height: 100vh;
    padding: 0px 8px;
    background: #fcfcfc;
  `;
  //Fetch and replace placeholder

  const fetchCreatedAdverts = async () => {
    const result = (await API.graphql(
      graphqlOperation(listAdvertisements, {
        filter: { giver: { eq: user.attributes.sub } },
      })
    )) as GraphQLResult<ListAdvertisementsQuery>;

    const advertItem = result.data?.listAdvertisements?.items;
    setAdverts(advertItem);
  };

  useEffect(() => {
    if(user.attributes.sub){
        fetchCreatedAdverts();
      }  
  }, [user]);

  const userInfo = [];

  for (let key in user.attributes) {
    userInfo.push(
      <div>
        <InformationHeader>{key}</InformationHeader>
        <InformationFrame>{user.attributes[key]}</InformationFrame>
      </div>
    );
  }

  return (
    <main>
      <h1> {user.attributes.name} </h1>
      <InformationContainer>
        <h3> Kontakt </h3>
        {userInfo}

        {<AdvertContainer searchValue={false} items={adverts} />}
      </InformationContainer>
    </main>
  );
}
