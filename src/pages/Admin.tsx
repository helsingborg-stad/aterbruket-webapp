/* eslint-disable no-console */
import React, { useEffect, useState, FC } from "react";
import { graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";
import styled from "styled-components";
import { listAdvertisements } from "../graphql/queries";
import { ListAdvertisementsQuery } from "../API";
import CountingCategorys from "../hooks/CountingCategorys";

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
  const [statusGroup, setStatusGroup] = useState([]) as any;
  console.log("statusGroup ", statusGroup[0]);

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
  console.log(notPickedUpItems);

  return (
    <main>
      <h1> Admin </h1>

      {statusGroup.map((statGroup: any) => {
        return (
          <div key={statGroup.option}>
            <InformationHeader>{statGroup.option}</InformationHeader>
            Mest populär kategori: {statGroup.most}
            {/* {statGroup.option === "available" &&
              statGroup.items.map((item: any) => {
                const x = showDays(item);
                console.log(
                  `Item id:${item.id} have been available in ${x} days`
                );
              })} */}
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

      <p>Denna kategorin är populärast ,både reserverade och tillgängliga </p>
      <p>
        Denna kategorin är minst populärast ,både reserverade och tillgängliga
      </p>

      <p>Denna kategorin är mest reserverad av alla återbrukade artiklar</p>
      <p>Denna kategorin är minst reserverad av alla återbrukade artiklar</p>
      <p>Hur många objekt bokas men hämtas inte (2 weeks)</p>
    </main>
  );
};

export default Admin;
