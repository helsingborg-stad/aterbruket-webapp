/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import React, { useEffect, useState, FC } from "react";
import { graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";
import styled from "styled-components";
import { listAdverts } from "../graphql/queries";
import { ListAdvertsQuery } from "../API";
import CountingCategorys from "../hooks/CountingCategorys";
import { fieldsForm } from "../utils/formUtils";
import ItemsToGet from "./ItemsToGet";

const OptionDiv = styled.div`
  width: 100%;
  text-align: center;
  margin: 10px;
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
      background-color: ${(props) => props.theme.colors.primaryDark};
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
  width: 90%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.5px solid #ececec;
  border-radius: 20px;
  text-align: center;
  margin: 5px;
  background-color: rgb(247, 247, 247);

  .groupTitle {
    margin-bottom: 0;
  }
`;

const Statics: FC = () => {
  const [allItems, setAllItems] = useState() as any;
  const [statusGroup, setStatusGroup] = useState([]) as any;
  const [infoOption, setInfoOption] = useState("total");
  const [Categorys, setCategorys] = useState() as any;
  const [selectDepartment, setSelectDepartment] = useState([
    { title: "Alla förvaltningar", filterOn: "all" },
    { title: "Återbruket", filterOn: "Larmvägen 33" },
  ]);
  const [selected, setSelected] = useState("all");
  const fetchItems = async () => {
    const result = (await API.graphql(
      graphqlOperation(listAdverts, { filter: { version: { eq: 0 } } })
    )) as GraphQLResult<ListAdvertsQuery>;
    const advertItems = result.data?.listAdverts?.items;
    setAllItems(advertItems);
    filterStatus(advertItems);
  };

  useEffect(() => {
    fetchItems();
    const found = fieldsForm.find((element) => {
      return element.name === "category";
    });

    // eslint-disable-next-line prefer-const
    let saveAllCategorys = {} as any;

    if (found && found.eng) {
      found.eng.map((cat: string) => {
        saveAllCategorys[cat] = 0;
      });
    }
    setCategorys(saveAllCategorys);

    return () => {};
  }, []);

  const filterStatus = (advertItems: any) => {
    const newStatusGroup = [
      { option: "available", sweOp: "Tillgängliga", items: [] as any },
      { option: "reserved", sweOp: "Reserverade", items: [] as any },
      { option: "pickedUp", sweOp: "Uthämtade", items: [] as any },
    ];
    advertItems.forEach((i: any) => {
      const index = newStatusGroup.findIndex(
        (group) => group.option === i.status
      );
      newStatusGroup[index].items.push(i);
    });

    const groups = CountingCategorys(newStatusGroup, Categorys);
    setStatusGroup(groups);
  };

  const filterItems = (filterOn: string) => {
    console.log(filterOn);
    console.log(allItems);
    let filteredItems = [] as any;
    if (filterOn === "all") {
      filteredItems = allItems;
    } else if (filterOn === "Larmvägen 33") {
      filteredItems = allItems.filter((item: any) => {
        return item.location.includes(filterOn);
      });
    }

    console.log("NEW LIST ", filteredItems);
    filterStatus(filteredItems);
  };

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
  const handleInputChange = (e: React.ChangeEvent<any>) => {
    setSelected(e.target.value);
    filterItems(e.target.value);
  };
  return (
    <>
      <label htmlFor="selectDepartment">Välj</label>
      <select
        name="selectDepartment"
        id="selectDepartment"
        onChange={(e) => handleInputChange(e)}
        defaultValue={selected}
      >
        {selectDepartment.map((which: { title: string; filterOn: string }) => {
          return (
            <option key={which.title} value={which.filterOn}>
              {which.title}
            </option>
          );
        })}
      </select>
      <OptionDiv>
        {infoOptions.map((opt) => {
          return (
            <button
              onClick={() => infoOptionControl(opt.key)}
              className={opt.key}
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
              <h4 className="groupTitle">{group.sweOp.toUpperCase()}</h4>
              {infoOption === "total" ? (
                <h4> {group.items.length} stycken</h4>
              ) : infoOption === "most" ? (
                <div>
                  <h4>
                    Kategori:{" "}
                    {group.most === "table"
                      ? "Bord"
                      : group.most === "desk"
                      ? "Skrivbord"
                      : group.most === "raiseAndLowerableDesk"
                      ? "Höj- och sänkbart skrivbord"
                      : group.most === "officeChair"
                      ? "Kontorsstol"
                      : group.most === "seatingFurniture"
                      ? "Sittmöbler"
                      : group.most === "other"
                      ? "Diverse"
                      : null}
                  </h4>
                  <h4>{group.mostNum} stycken</h4>
                </div>
              ) : infoOption === "least" ? (
                <div>
                  <h4>
                    Kategori:{" "}
                    {group.min === "table"
                      ? "Bord"
                      : group.min === "desk"
                      ? "Skrivbord"
                      : group.min === "raiseAndLowerableDesk"
                      ? "Höj- och sänkbart skrivbord"
                      : group.min === "officeChair"
                      ? "Kontorsstol"
                      : group.min === "seatingFurniture"
                      ? "Sittmöbler"
                      : group.min === "other"
                      ? "Diverse"
                      : null}
                  </h4>
                  <h4>{group.minNum} stycken</h4>
                </div>
              ) : null}
            </GroupDiv>
          );
        })}
      </InfoWrapper>
    </>
  );
};

export default Statics;
