/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import React, { useEffect, useState, FC } from "react";
import { graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";
import styled from "styled-components";
import { listAdvertisements } from "../graphql/queries";
import { ListAdvertisementsQuery } from "../API";
import CountingCategorys from "../hooks/CountingCategorys";

const OptionDiv = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 5px;
  button {
    border: none;
    margin: 2px;
    font-weight: 700;
    background-color: #e1e9db;
    color: #205400;
    height: 1.5rem;
    border-radius: 5px;

    :active,
    :focus {
      background-color: #205400;
      color: white;
      outline: none;
    }
  }
`;

const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: center;
`;

const GroupDiv = styled.div`
  width: 49.2%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.5px solid #ececec;
  text-align: center;
`;
// const InformationFrame = styled.header`
//   padding: 24px;
//   background: linear-gradient(0deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)),
//     #ffffff;
//   border-radius: 4.5px;
// `;

// const InformationHeader = styled.p`
//   text-transform: uppercase;
//   color: #0069b4;
// `;

// const InformationContainer = styled.div`
//   width: 90%;
//   height: 100vh;
//   background: #fcfcfc;
// `;

const Admin: FC = () => {
  const [statusGroup, setStatusGroup] = useState([]) as any;
  const [infoOption, setInfoOption] = useState("total");
  console.log("statusGroup ", statusGroup[0]);

  // visa antalet dagar itemsen har stått där
  // antalet dagar sedan skapade

  const showHowDays = () => {
    if (statusGroup[0]) {
      const createdAt = Date.parse(statusGroup[0].items[0].createdAt); // pars to number
      const convertedCreatedAt = new Date(createdAt); // convert createdAT to date obj
      console.log("String from item ", statusGroup[0].items[0].createdAt); // string
      console.log("Converted number from item ", createdAt);
      console.log("D ", convertedCreatedAt); // object
      const today = new Date();
      const diffInTime = today.getTime() - convertedCreatedAt.getTime();
      const diffInDays = diffInTime / (1000 * 3600 * 24);
      console.log("Today", today); // obj
      console.log("Diff Time ", diffInTime);
      console.log("Diff in Days is ", diffInDays);
      console.log("Diff in Days is ", Math.round(diffInDays));
    }
  };

  showHowDays();

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

  const infoOptions = [
    { option: "Total", key: "total" },
    { option: "Mest Poplulär", key: "most" },
    { option: "Minst Populär", key: "least" },
  ];

  const infoOptionControl = (option: string) => {
    if (option === "total") {
      setInfoOption("total");
    } else if (option === "most") {
      setInfoOption("most");
    } else if (option === "least") {
      setInfoOption("least");
    }
  };

  return (
    <main>
      <h2> Admin </h2>
      <OptionDiv>
        {infoOptions.map((opt) => {
          return (
            <button
              onClick={() => infoOptionControl(opt.key)}
              key={opt.key}
              type="button"
            >
              {opt.option}
            </button>
          );
        })}
      </OptionDiv>
      <InfoWrapper>
        {statusGroup.map((group: any) => {
          return (
            <GroupDiv key={group.option}>
              <h4>{group.option.toUpperCase()}</h4>
              {infoOption === "total" ? (
                <h3> {group.items.length} </h3>
              ) : infoOption === "most" ? (
                <div>
                  <h4>{group.most}</h4>
                  <h4>{group.mostNum}</h4>
                </div>
              ) : infoOption === "least" ? (
                <div>
                  <h4>{group.min}</h4>
                  <h4>{group.minNum}</h4>
                </div>
              ) : null}
            </GroupDiv>
          );
        })}
      </InfoWrapper>
      {/* {statusGroup.map((statGroup: any) => {
        return (
          <div key={statGroup.option}>
            <InformationHeader>{statGroup.option}</InformationHeader>
            <InformationFrame>
              Mest populär kategori: {statGroup.most}
            </InformationFrame>
            <InformationFrame>
              Annonser: {statGroup.mostNum} stycken
            </InformationFrame>
            <InformationFrame>
              Impopulära kategori: {statGroup.min}
            </InformationFrame>
            <InformationFrame>
              Annonser: {statGroup.minNum} stycken
            </InformationFrame>
          </div>
        );
      })}

      <p>Denna kategorin är populärast ,både reserverade och tillgängliga </p>
      <p>
        Denna kategorin är minst populärast ,både reserverade och tillgängliga
      </p>

      <p>Denna kategorin är mest reserverad av alla återbrukade artiklar</p>
      <p>Denna kategorin är minst reserverad av alla återbrukade artiklar</p>
      <p>Hur många objekt bokas men hämtas inte (2 weeks)</p> */}
    </main>
  );
};

export default Admin;
