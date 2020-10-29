import React, { FC } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  description: string;
  id: string;
  status: string;
}

const CardDiv = styled.div`
  width: 100%;
  height: 140px;
  background-color: ${(props) => props.theme.cardTheme.backgroundColor};
  margin-top: 10px;
  border-radius: 9.5px;
  box-shadow: 0px 0px 2px rgba(98, 98, 98, 0.18),
    0px 1px 2px rgba(98, 98, 98, 0.18);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  align-self: stretch;
  text-decoration: none;

  :active,
  :visited {
    opacity: 0.8;
    text-decoration: none;
  }

  .picDiv {
    width: 35%;
    align-self: stretch;

    img {
      width: 100%;
      height: 100%;
      align-self: stretch;
      object-fit: cover;
    }
  }

  .infoDiv {
    width: 65%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 24px 0px 0px 24px;
    align-self: center;
  }
  h3,
  h4,
  p {
    margin: 0px 0px 10px 0px;
  }
  h3 {
    color: ${(props) => props.theme.cardTheme.titleColor};
    font-weight: bold;
    font-size: 18px;
    line-height: 112%;
    letter-spacing: 0.0025em;
  }
  h4 {
    color: ${(props) => props.theme.cardTheme.amountColor};
    font-weight: 900;
    font-size: 12px;
    line-height: 132%;
    letter-spacing: 0.015em;
  }
  p {
    color: ${(props) => props.theme.cardTheme.descColor};
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    letter-spacing: 0.005em;
  }
`;

const Card: FC<Props> = ({ id, title, description, status }: Props) => {
  return (
    <CardDiv as={Link} to={`/item/${id}`} id={id}>
      <div className="picDiv">
        <img
          src="https://storage.googleapis.com/web-pro-nilo-kavehome/media/cache/c4/10/c410118add2b5cb169d71a0c20596f50.jpg"
          alt=""
        />
      </div>
      <div className="infoDiv">
        <h3>Title: {title}</h3>
        <h4>xx stycken</h4>
        <p>STATUS IS: {status}</p>
        <p>Description: {description}</p>
      </div>
    </CardDiv>
  );
};

export default Card;
