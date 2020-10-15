import React, { FC } from "react";
import styled from "styled-components";

interface Props {
  title: string;
  description: string;
  width: number;
  id: string;
}

const CardDiv = styled.div`
  width: 100%;
  background-color: #fbf7f0;
  margin-top: 10px;
  border-radius: 2px;
  box-sizing: border-box;
  :active {
    opacity: 0.8;
  }
`;

const Card = (props: Props) => {
  return (
    <CardDiv id={props.id} onClick={() => console.log(props.id)}>
      <h2>{props.title}</h2>

      <p>{props.description}</p>

      <p>{props.width}</p>
    </CardDiv>
  );
};

export default Card;
