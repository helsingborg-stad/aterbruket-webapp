import React, { FC } from "react";
import styled from "styled-components";
import Card from "./Card";

interface IAdvert {
  items: any;
  searchValue: any;
  itemsFrom: string;
  filtered: boolean;
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

const AdvertContainer: FC<IAdvert> = ({
  items,
  searchValue,
  itemsFrom,
  filtered,
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
        {itemsFrom === "home" && filtered ? (
          <h3>Aktiva filter</h3>
        ) : (
          <h3>Alla möbler</h3>
        )}
        {itemsFrom === "haffat" && <h3>Saker att hämta</h3>}
        {itemsFrom === "profile" && <h3>Mina annonser</h3>}
      </div>
      {filteredItems.map((filteredItem: any) => (
        <Card
          key={filteredItem.id}
          id={filteredItem.id}
          title={filteredItem.title}
          description={filteredItem.description}
          condition={filteredItem.condition}
          quantity={filteredItem.quantity}
          imageKey={filteredItem.images[0].src}
        />
      ))}
    </AdvertContainerDiv>
  );
};
export default AdvertContainer;
