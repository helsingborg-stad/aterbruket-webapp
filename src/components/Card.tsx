import React, { FC, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { API, Storage } from "aws-amplify";

interface Props {
  title: string;
  description: string;
  id: string;
  status: string;
  quantity: number;
  imageKey: string;
}

const CardDiv = styled.div`
  width: 100%;
  max-height: 350px;
  min-height: 170px;
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
      border-radius: 9.5px 0 0 9.5px;
    }
  }

  .infoDiv {
    width: 65%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 24px 0px 0px 24px;
    box-sizing: border-box;
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
    font-size: 16px;
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

  p.desc {
    width: 80%;
    height: 50px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const Card: FC<Props> = ({
  id,
  title,
  description,
  status,
  quantity,
  imageKey,
}: Props) => {
  const [url, setURL] = useState(undefined) as any;
  const fetchImage = (): void => {
    Storage.get(imageKey).then((url: any) => {
      setURL(url);
    });
  };
  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <CardDiv as={Link} to={`/item/${id}`} id={id}>
      <div className="picDiv">
        <img src={url} alt="" />
      </div>
      <div className="infoDiv">
        <h3>{title}</h3>
        <h4>{quantity} stycken</h4>
        <p>Status: {status}</p>
        <p className="desc">Beskrivning: {description}</p>
      </div>
    </CardDiv>
  );
};

export default Card;
