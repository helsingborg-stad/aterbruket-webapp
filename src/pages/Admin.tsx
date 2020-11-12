/* eslint-disable no-console */
import React, { useEffect, useState, FC } from "react";
import { graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";
import styled from "styled-components";
import { listAdvertisements } from "../graphql/queries";
import { ListAdvertisementsQuery } from "../API";
import CountingCategorys from "../hooks/CountingCategorys";
// import DatePicker from "../components/DatePicker";

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

const Admin: FC = () => {
  const [statusGroup, setStatusGroup] = useState([]) as any; // Alla grupperna
  console.log("statusGroup ", statusGroup);

  const filterStatus = (advertItems: any) => {
    const newStatusGroup = [
      { option: "available", items: [] as any },
      { option: "reserved", items: [] as any },
      { option: "pickedUp", items: [] as any },
      { option: "delivered", items: [] as any },
    ];
    advertItems.forEach((i: any) => {
      const index = newStatusGroup.findIndex(
        (group) => group.option === i.status
      );
      newStatusGroup[index].items.push(i);
    });

    const groups = CountingCategorys(newStatusGroup);
    setStatusGroup(groups);
  };

  const fetchItems = async () => {
    const result = (await API.graphql(
      graphqlOperation(listAdvertisements)
    )) as GraphQLResult<ListAdvertisementsQuery>;
    const advertItems = result.data?.listAdvertisements?.items;
    filterStatus(advertItems);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const showDays = (item: any) => {
    const createdAt = Date.parse(item.createdAt);
    const convertedCreatedAt = new Date(createdAt);
    const today = new Date();
    const diffInTime = today.getTime() - convertedCreatedAt.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    return Math.round(diffInDays);
  };

  let count = 0;
  let notPickedUpItems = [] as any;
  // console.log(notPickedUpItems);

  return (
    <main>
      <h1> Admin </h1>
      {/* <DatePicker /> */}

      {statusGroup.map((statGroup: any) => {
        return (
          <div key={statGroup.option}>
            <InformationHeader>{statGroup.option}</InformationHeader>
            Mest populär kategori: {statGroup.most} {statGroup.mostNum}
            {/* Visar hur länge alla object står.
             *** Ska vi visa vilka items?
             *** Ska vi bara visa X antal? */}
            {statGroup.option === "available" &&
              statGroup.items.map((item: any) => {
                const x = showDays(item);
                console.log(
                  `Item id:${item.id} have been available in ${x} days`
                );
              })}
            {/* Visar hur länge alla object har varit reserverade OCH alla som varit det i över 14 dagar sparas i en array
             *** Hur ska de sparas bäst för att renderas?
             *** Hur ska vi visa vilka som inte har hämtats ut?  */}
            {statGroup.option === "reserved" &&
              statGroup.items.map((item: any) => {
                const x = showDays(item);
                console.log(
                  `Item id:${item.id} have been reserved in ${x} days`
                );
                if (x > 14) {
                  count += 1;
                  notPickedUpItems.push(item);
                }
                console.log(
                  `there is ${count} items that have been reserved but not picked up yet. `
                );
              })}
          </div>
        );
      })}
    </main>
  );
};

export default Admin;
