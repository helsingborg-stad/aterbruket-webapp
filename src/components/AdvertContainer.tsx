import React, { FC } from "react";
import styled from "styled-components";
import Card from "./Card";

interface IAdvert {
  items: any;
  searchValue: any;
  itemsFrom: string;
  filteredSweValues: any;
  activeSorting: string;
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
    flex-direction: column;
    justy h3 {
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
  activeSorting,
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
        {itemsFrom === "home" && activeSorting !== "" && (
          <OptionWrapper>
            <h3>Sorterar på:</h3>
            <span className="options" style={{ margin: "5px" }}>
              {activeSorting}
            </span>
          </OptionWrapper>
        )}

        {itemsFrom === "haffat" && <h3>Saker att hämta</h3>}
        {itemsFrom === "profile" && <h3>Mina annonser</h3>}
      </div>
      {filteredItems.map((filteredItem: any) => (
        <Card
          climat={filteredItem.climateImpact}
          key={filteredItem.id}
          id={filteredItem.id}
          title={filteredItem.title}
          description={filteredItem.description}
          condition={filteredItem.condition}
          quantity={filteredItem.quantity}
          imageKey={filteredItem.images[0].src}
          daysAt={filteredItem.createdAt}
        />
      ))}
    </AdvertContainerDiv>
  );
};
export default AdvertContainer;
