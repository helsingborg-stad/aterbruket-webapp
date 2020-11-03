import React from "react";
import styled from "styled-components";
import Card from "./Card";

const AdvertContainerDiv = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 120px;

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

const AdvertContainer = (props: { adverts: any[]; }) => {
  
  return (
    <AdvertContainerDiv>
      <div className="allaDiv">
        <h3>Alla</h3>
      </div>
      {props.adverts.map((item: any) =>
        item.status === "available" ||
        item.status === "reserved" ||
        item.status === null ? (
          <Card
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            status={item.status}
          />
        ) : null
      )}
    </AdvertContainerDiv>
  );
};
export default AdvertContainer;
