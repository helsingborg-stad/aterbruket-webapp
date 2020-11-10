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
  /* ******** my old code  just keep temporary ***** */

  // const [items, setItems] = useState({}) as any;
  // //   let newcategories = [];

  // const fetchItems = async () => {
  //   const result = (await API.graphql(
  //     graphqlOperation(listAdvertisements)
  //   )) as GraphQLResult<ListAdvertisementsQuery>;
  //   const advertItems = result.data?.listAdvertisements?.items;

  //   setItems(advertItems);
  // };

  // console.log("items", items);

  // // Step 1 make each categories into an object and add key "amount"

  // const categories: string[] = [
  //   "table",
  //   "desk",
  //   "raiseAndLowerableDesk",
  //   "officeChair",
  //   "chair",
  //   "other",
  // ];

  // let newCategories = categories.map((category, idx) => {
  //   return {
  //     cateName: category,
  //     amount: 0,
  //   };
  // });

  // console.log("new categories", newCategories);

  // // Step 2, loop through items in the database and check category and count amount in each category in the new Categories array

  // if (items[0]) {
  //   const categories = items.map((item: any, idx: number) => {
  //     return item.category;
  //   });
  // }
  // const [items, setItems] = useState({}) as any;

  /* ******** above is my old code ***** */

  const [category, setCategory] = useState({}) as any;
  const [statusGroup, setStatusGroup] = useState([]) as any;
  const [statistics, setStatistics] = useState([
    { option: "available", most: "", mostNum: 0, least: "", leastNum: 0 },
    { option: "reserved", most: "", mostNum: 0, least: "", leastNum: 0 },
  ]) as any;

  const mostCommonWord = () => {
    let maxValue = 0 as any;
    let maxKey = "";

    Object.entries(category).forEach((entry) => {
      const [key, value] = entry;

      console.log(key, value);
      if (category[key] > maxValue) {
        maxValue = value;
        maxKey = key;
      }
      console.log(maxKey, maxValue);
      return setStatistics({
        ...statistics,
        popularCategory: maxKey,
        popularCategoryNumber: maxValue,
      });
    });
  };

  // the following function need to be altered to count the items's category amout in different status group
  const countingCategorys = (groups: any) => {
    console.log(groups);

    groups.forEach((group: any) => {
      console.log("group", group);
      const itemsInGroup = group.items;
      console.log("itemsInGroup", itemsInGroup);

      // if (item.category in category) {
      //   setCategory((category[item.category] += 1));
      // } else {
      //   setCategory((category[item.category] = 1));
      // }
    });
    console.log("cat", category);

    mostCommonWord();
  };

  // filter out different status group
  const filterStatus = (advertItems: any) => {
    const newStatusGroup = [
      { option: "available", items: [] as any },
      { option: "reserved", items: [] as any },
    ];
    advertItems.forEach((i: any) => {
      const index = newStatusGroup.findIndex(
        (group) => group.option === i.status
      );
      console.log(index);

      newStatusGroup[index].items.push(i);
    });
    console.log("filtered", newStatusGroup);

    countingCategorys(newStatusGroup);
  };

  const fetchItems = async () => {
    const result = (await API.graphql(
      graphqlOperation(listAdvertisements)
    )) as GraphQLResult<ListAdvertisementsQuery>;
    const advertItems = result.data?.listAdvertisements?.items;
    filterStatus(advertItems);
    // countingCategorys(advertItems);
    // setItems(advertItems);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <main>
      <h1> Admin </h1>
      <p>
        Den kategori som är populärast är {statistics.popularCategory}:{" "}
        {statistics.popularCategoryNumber}
      </p>
    </main>
  );
};

export default Admin;
