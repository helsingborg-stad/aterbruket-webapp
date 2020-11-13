/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import React, { useEffect, useState, FC } from "react";
import { graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";
import styled from "styled-components";
import { listAdverts } from "../graphql/queries";
import { ListAdvertsQuery } from "../API";
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
const Admin: FC = () => {
  const [statusGroup, setStatusGroup] = useState([]) as any;
  const [infoOption, setInfoOption] = useState("total");
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
      graphqlOperation(listAdverts, { filter: { version: { eq: 0 } } })
    )) as GraphQLResult<ListAdvertsQuery>;
    const advertItems = result.data?.listAdverts?.items;
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
                <h3> {group.items.length} stycken</h3>
              ) : infoOption === "most" ? (
                <div>
                  <h4>
                    Kategori:{" "}
                    {group.most === "table"
                      ? "Bord"
                      : group.most === "desk"
                      ? "Skrivbord"
                      : group.most === "raiseAndLowerableDesk"
                      ? "Höj och sänkbart skrivbord"
                      : group.most === "officeChair"
                      ? "Kontorsstol"
                      : group.most === "chair"
                      ? "Stol"
                      : group.most === "other"
                      ? "Övrigt"
                      : null}
                  </h4>
                  <h4>{group.mostNum} styken</h4>
                </div>
              ) : infoOption === "least" ? (
                <div>
                  <h4>
                    Kategori:{" "}
                    {group.min === "table"
                      ? "bord"
                      : group.min === "desk"
                      ? "Skrivbord"
                      : group.min === "raiseAndLowerableDesk"
                      ? "Höj och sänkbart skrivbord"
                      : group.min === "officeChair"
                      ? "Kontorsstol"
                      : group.min === "chair"
                      ? "Stol"
                      : group.min === "other"
                      ? "Övrigt"
                      : null}
                  </h4>
                  <h4>{group.minNum} styken</h4>
                </div>
              ) : null}
            </GroupDiv>
          );
        })}
      </InfoWrapper>
    </main>
  );
};

export default Admin;
