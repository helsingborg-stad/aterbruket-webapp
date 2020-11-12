/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import React, { useEffect, useState, FC } from "react";
import { graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";
import styled from "styled-components";
import { listAdvertisements } from "../graphql/queries";
import { ListAdvertisementsQuery } from "../API";
import CountingCategorys from "../hooks/CountingCategorys";
// import DatePicker from "../components/DatePicker";

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
const Admin: FC = () => {
  const [statusGroup, setStatusGroup] = useState([]) as any;
  const [infoOption, setInfoOption] = useState("total");
  console.log("statusGroup ", statusGroup[0]);

  const showDays = (item: any) => {
    const createdAt = Date.parse(item.createdAt);
    const convertedCreatedAt = new Date(createdAt);
    const today = new Date();
    const diffInTime = today.getTime() - convertedCreatedAt.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    return Math.round(diffInDays);
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
  let count = 0;
  let notPickedUpItems = [];

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
              <h4>Annat</h4>
              {/* Visar hur länge alla object står.
               *** Ska vi visa vilka items?
               *** Ska vi bara visa X antal? */}
              {group.option === "available" &&
                group.items.map((item: any) => {
                  const x = showDays(item);
                  // console.log(
                  //   `Item id:${item.id} have been available in ${x} days`
                  // );
                  return (
                    <p key={item.id}>
                      Item id: {item.id} have been available in {x} days
                    </p>
                  );
                })}
              {/* Visar hur länge alla object har varit reserverade OCH alla som varit det i över 14 dagar sparas i en array
               *** Hur ska de sparas bäst för att renderas?
               *** Hur ska vi visa vilka som inte har hämtats ut?  */}
              {group.option === "reserved" &&
                group.items.forEach((item: any) => {
                  const x = showDays(item);
                  console.log(
                    `Item id:${item.id} have been reserved in ${x} days`
                  );
                  if (x > 14) {
                    count += 1;
                    notPickedUpItems.push(item);
                  }
                })}
              {group.option === "reserved" && (
                <p>
                  there is {count} items that have been reserved but not picked
                  up yet.
                </p>
              )}
            </GroupDiv>
          );
        })}
      </InfoWrapper>
      {/* <DatePicker /> */}
    </main>
  );
};

export default Admin;
