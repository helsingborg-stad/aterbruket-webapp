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
  // const [items, setItems] = useState({}) as any;
  const [category, setCategory] = useState({}) as any;
  const [statistics, setStatistics] = useState({
    popularCategory: "",
    popularCategoryNumber: 0,
  }) as any;

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

  const countingCategorys = (advertItems: any) => {
    console.log(advertItems);
    advertItems.map((item: any) => {
      if (item.category in category) {
        setCategory((category[item.category] += 1));
      } else {
        setCategory((category[item.category] = 1));
      }
    });
    console.log(category);
    mostCommonWord();
  };

  const fetchItems = async () => {
    const result = (await API.graphql(
      graphqlOperation(listAdvertisements)
    )) as GraphQLResult<ListAdvertisementsQuery>;
    const advertItems = result.data?.listAdvertisements?.items;
    countingCategorys(advertItems);
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
