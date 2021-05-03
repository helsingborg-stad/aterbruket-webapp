import React, { FC } from "react";
import styled from "styled-components";
import Card from "./Card";

interface IAdvert {
  items: any;
  searchValue: any;
  itemsFrom: string;
  filteredSweValues: any;
  fetchReservedAdverts?: any;
}

const AdvertContainerDiv = styled.div`
  width: 90%;
  max-width: 700px;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 15px;

  .allaDiv {
    width: 100%;
    display: flex;
    align-items: flex-start;
    h3 {
      color: #3d3d3d;
      margin: 10px;
    }
  }
`;

const OptionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  .options {
    font-weight: 900;
    font-size: 12px;
    line-height: 150%;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.05em;
    text-transform: uppercase;

    background-color: #e1e9db;

    color: ${(props) => props.theme.colors.primaryDark};
    border-radius: 4.5px;
  }
`;

const AdvertContainer: FC<IAdvert> = ({
  items,
  searchValue,
  itemsFrom,
  filteredSweValues,
  fetchReservedAdverts,
}: IAdvert) => {
  let filteredItems = [];
  if (searchValue) {
    filteredItems = items.filter((item: any) => {
      return (
        item.title.toLowerCase().indexOf(searchValue.toLocaleLowerCase()) !==
          -1 ||
        item.description
          .toLowerCase()
          .indexOf(searchValue.toLocaleLowerCase()) !== -1
      );
    });
  } else {
    filteredItems = items;
  }

  return (
    <AdvertContainerDiv>
      <div className="allaDiv">
        {itemsFrom === "home" && filteredSweValues.length > 0 ? (
          <OptionWrapper>
            <h3>Aktiva filter :</h3>
            {filteredSweValues.map((value: string) => {
              return (
                <span className="options" key={value} style={{ margin: "5px" }}>
                  {value}
                </span>
              );
            })}
          </OptionWrapper>
        ) : (
          itemsFrom === "home" && <h3>Alla möbler</h3>
        )}
        {itemsFrom === "haffat" && items.length !== 0 && (
          <h3>Grejer att hämta</h3>
        )}
        {itemsFrom === "pickedUp" && <h3>Grejer du hämtat tidigare</h3>}
        {itemsFrom === "profile" && <h3>Mina annonser</h3>}
      </div>
      {filteredItems.map((filteredItem: any) => (
        <Card
          key={filteredItem.id}
          imageKey={filteredItem.images[0].src}
          filteredItem={filteredItem}
          fetchReservedAdverts={fetchReservedAdverts}
        />
      ))}
    </AdvertContainerDiv>
  );
};
export default AdvertContainer;
