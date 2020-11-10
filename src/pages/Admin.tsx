/* eslint-disable no-console */
import React, { useEffect, useState, FC } from "react";
import { graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";
import styled from "styled-components";
import { listAdvertisements } from "../graphql/queries";
import { ListAdvertisementsQuery } from "../API";

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
  console.log("statusGroup ", statusGroup);

  const mostCommonCategory = (obj: any) => {
    let maxValue = 0 as any;
    let maxKey = "";

    Object.entries(obj).forEach((entry) => {
      const [key, value] = entry;

      if (obj[key] > maxValue) {
        maxValue = value;
        maxKey = key;
      }
    });
    return { most: maxKey, mostNum: maxValue };
  };

  const countingCategorys = (groups: any) => {
    groups.forEach((group: any) => {
      const cateAmount = {
        table: 0,
        desk: 0,
        raiseAndLowerableDesk: 0,
        officeChair: 0,
        chair: 0,
        other: 0,
      } as any;

      const eachGroup = group;
      const itemsInGroup = eachGroup.items;

      itemsInGroup.forEach((i: any) => {
        if (i.category in cateAmount) {
          cateAmount[i.category] += 1;
        } else {
          cateAmount[i.category] = 1;
        }
      });
      eachGroup.categoryAmount = cateAmount;
      const mostComon = mostCommonCategory(cateAmount);

      eachGroup.most = mostComon.most;
      eachGroup.mostNum = mostComon.mostNum;
    });

    setStatusGroup(groups);
  };
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

    countingCategorys(newStatusGroup);
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

  return (
    <main>
      <h1> Admin </h1>
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
