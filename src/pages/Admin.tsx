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
  const [items, setItems] = useState({}) as any;
  //   let newcategories = [];

  const fetchItems = async () => {
    const result = (await API.graphql(
      graphqlOperation(listAdvertisements)
    )) as GraphQLResult<ListAdvertisementsQuery>;
    const advertItems = result.data?.listAdvertisements?.items;

    setItems(advertItems);
  };

  console.log("items", items);

  // Step 1 make each categories into an object and add key "amount"

  const categories: string[] = [
    "table",
    "desk",
    "raiseAndLowerableDesk",
    "officeChair",
    "chair",
    "other",
  ];

  let newCategories = categories.map((category, idx) => {
    return {
      cateName: category,
      amount: 0,
    };
  });

  console.log("new categories", newCategories);

  // Step 2, loop through items in the database and check category and count amount in each category in the new Categories array

  if (items[0]) {
    const categories = items.map((item: any, idx: number) => {
      return item.category;
    });
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <main>
      <h1> Admin </h1>
      {/* <p>Vilken kategori är mest populär {statistics.popularCategory}</p> */}
    </main>
  );
};

export default Admin;
