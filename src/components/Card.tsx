import React, { FC } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
  text-decoration: none;

  :active {
    opacity: 0.8;
  }

  :visited {
    color: black;
  }
`;

const Card: FC<Props> = ({ id, title, description, width }: Props) => {
  return (
    <CardDiv as={Link} to={`/item/${id}`} id={id}>
      <h2>Title: {title}</h2>

      <p>Description: {description}</p>

      <p>Width: {width}</p>
    </CardDiv>
  );
};

export default Card;
