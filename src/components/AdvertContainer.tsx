import React, { FC } from "react";
import styled from "styled-components";
import Card from "./Card";

interface IAdvert {
  items: any;
  searchValue: any;
}

const AdvertContainerDiv = styled.div`
  width: 90%;
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

const AdvertContainer: FC<IAdvert> = ({ items, searchValue }: IAdvert) => {
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
        <h3>All</h3>
      </div>
      {filteredItems.map((filteredItem: any) =>
        filteredItem.status === "available" ||
        filteredItem.status === "reserved" ||
        filteredItem.status === null ? (
          <Card
            key={filteredItem.id}
            id={filteredItem.id}
            title={filteredItem.title}
            description={filteredItem.description}
            status={filteredItem.status}
          />
        ) : null
      )}
    </AdvertContainerDiv>
  );
};
export default AdvertContainer;
