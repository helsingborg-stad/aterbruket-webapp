import React, { FC, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { MdArrowForward } from "react-icons/md";
import { graphqlOperation } from "@aws-amplify/api";
import { createAdvert, updateAdvert } from "../graphql/mutations";
import UserContext from "../contexts/UserContext";

interface Props {
  imageKey: string;
  filteredItem: any;
  fetchReservedAdverts: any;
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
    width: 25%;
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

  p.desc {
    width: 80%;
    height: 50px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .btn--pickUp {
    width: 202px;
    height: 40px;
    border: none;
    margin: 0px 24px 24px 0px;
    padding-left: 12px;
    background-color: ${(props) => props.theme.colors.primaryLighter};
    box-sizing: border-box;
    border-radius: 4.5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      font-family: ${(props) => props.theme.appTheme.fontFamily};
      font-weight: 500;
      font-size: 18px;
      line-height: 132%;
      font-style: normal;
      color: ${(props) => props.theme.colors.primaryDark};
    }
    svg {
      color: ${(props) => props.theme.colors.secondaryDark};
      font-size: 24px;
    }
  }
`;

const Card: FC<Props> = ({
  imageKey,
  filteredItem,
  fetchReservedAdverts,
}: Props) => {
  const [url, setURL] = useState(undefined) as any;
  const { user } = useContext(UserContext);
  const [itemUpdated, setItemUpdated] = useState(false);

  const fetchImage = (): void => {
    Storage.get(imageKey).then((url: any) => {
      setURL(url);
    });
  };
  useEffect(() => {
    fetchImage();
  }, []);

  const updateItem = async (newStatus: string) => {
    const result = (await API.graphql(
      graphqlOperation(updateAdvert, {
        input: {
          id: filteredItem.id,
          status: newStatus,
          reservedBySub: user.sub,
          reservedByName: user.name,
          version: 0,
          revisions: filteredItem.revisions + 1,
        },
      })
    )) as any;

    setItemUpdated(true);

    delete filteredItem.createdAt;
    delete filteredItem.updatedAt;
    filteredItem.version = result.data.updateAdvert.revisions + 1;

    await API.graphql(graphqlOperation(createAdvert, { input: filteredItem }));
  };

  const onClickPickUpBtn = () => {
    updateItem("pickedUp");
  };

  useEffect(() => {
    if (itemUpdated) {
      fetchReservedAdverts();
      setItemUpdated(false);
    }
  }, [itemUpdated]);

  return (
    <CardDiv
      as={Link}
      to={`/item/${filteredItem.id}`}
      id={filteredItem.id}
      style={{
        opacity: filteredItem.status === "pickedUp" ? "0.5" : "1",
        filter: filteredItem.status === "pickedUp" ? "grayscale(1)" : "none",
      }}
    >
      <div className="picDiv">
        <img src={url} alt="" />
      </div>
      <div className="infoDiv">
        <h3>{filteredItem.title}</h3>
        <h4>{filteredItem.quantity} stycken</h4>
        <p className="desc">Beskrivning: {filteredItem.description}</p>
        {filteredItem.status === "reserved" && (
          <button
            className="btn--pickUp"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onClickPickUpBtn();
            }}
          >
            <span>Haffa ut!</span>

            <MdArrowForward />
          </button>
        )}
      </div>
    </CardDiv>
  );
};

export default Card;
