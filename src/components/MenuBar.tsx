import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MdHome, MdCloud, MdChat, MdPerson } from "react-icons/md";

const MenuDiv = styled.div`
  width: 100vw;
  height: 8vh;
  background-color: #f8f8f8;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .link {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    flex-grow: 1;
    color: #a3a3a3;
    font-size: 10px;

    .icon {
      font-size: 18px;
    }
    :active,
    :focus {
      color: #80b14a;
    }
  }
`;

const MenuBar: FC = () => {
  return (
    <MenuDiv>
      <Link className="link" to="/">
        <MdHome className="icon" />
        Hem
      </Link>
      <Link className="link" to="/">
        <MdCloud className="icon" />
        Haffat
      </Link>
      <Link className="link" to="/message">
        <MdChat className="icon" />
        Meddelenden
      </Link>
      <Link className="link" to="/profile">
        <MdPerson className="icon" />
        Profil
      </Link>
    </MenuDiv>
  );
};

export default MenuBar;
