import React, { FC } from "react";
import styled from "styled-components";
import Card from "./Card";

interface IAdvert {
  items: any;
  searchValue: any;
  itemsFrom: string;
}

const AdvertContainerDiv = styled.div`
  width: 90%;
  max-width: 700px;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 50px;

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

const AdvertContainer: FC<IAdvert> = ({
  items,
  searchValue,
  itemsFrom,
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
        {itemsFrom === "home" && <h3>Alla möbler</h3>}
        {itemsFrom === "haffat" && <h3>Saker att hämta</h3>}
        {itemsFrom === "profile" && <h3>Mina annonser</h3>}
      </div>

      {itemsFrom === "home" &&
        filteredItems.map((filteredItem: any) =>
          filteredItem.status === "available" ||
          filteredItem.status === null ? (
            <Card
              key={filteredItem.id}
              id={filteredItem.id}
              title={filteredItem.title}
              description={filteredItem.description}
              status={filteredItem.status}
              quantity={filteredItem.quantity}
              imageKey={filteredItem.images[0].src}
            />
          ) : null
        )}

      {itemsFrom === "haffat" &&
        filteredItems.map((filteredItem: any) =>
          filteredItem.status === "reserved" ||
          filteredItem.status === "pickedUp" ? (
            <Card
              key={filteredItem.id}
              id={filteredItem.id}
              title={filteredItem.title}
              description={filteredItem.description}
              status={filteredItem.status}
              quantity={filteredItem.quantity}
              imageKey={filteredItem.images[0].src}
            />
          ) : null
        )}

      {itemsFrom === "profile" &&
        filteredItems.map((filteredItem: any) =>
          filteredItem.status === "available" ||
          filteredItem.status === "reserved" ||
          filteredItem.status === null ? (
            <Card
              key={filteredItem.id}
              id={filteredItem.id}
              title={filteredItem.title}
              description={filteredItem.description}
              status={filteredItem.status}
              quantity={filteredItem.quantity}
              imageKey={filteredItem.images[0].src}
            />
          ) : null
        )}
    </AdvertContainerDiv>
  );
};
export default AdvertContainer;
