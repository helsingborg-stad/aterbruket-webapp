import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { MdHome, MdCloud, MdPerson, MdHelp } from "react-icons/md";

const MenuDiv = styled.div`
  width: 100vw;
  height: 8vh;
  background-color: ${(props) => props.theme.colors.offWhite};
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

    :focus {
      color: ${(props) => props.theme.colors.primaryLight};
    }
  }
`;
interface IQrCamera {
  delay: number;
  result: string;
}

type Props = {
  qrCamera: IQrCamera;
  setQrCamera: React.Dispatch<
    React.SetStateAction<{
      delay: number;
      result: string;
    }>
  >;
};

const MenuBar: FC<Props> = ({ setQrCamera, qrCamera }: Props) => {
  return (
    <MenuDiv>
      <NavLink
        className="link"
        activeStyle={{
          color: "#80B14A",
        }}
        to="/app"
        onClick={() => setQrCamera({ ...qrCamera, result: "" })}
      >
        <MdHome className="icon" />
        Hem
      </NavLink>
      <NavLink
        className="link"
        activeStyle={{
          color: "#80B14A",
        }}
        to="/haffat"
      >
        <MdCloud className="icon" />
        Haffat
      </NavLink>

      <NavLink
        className="link"
        activeStyle={{
          color: "#80B14A",
        }}
        to="/profile"
      >
        <MdPerson className="icon" />
        Profile
      </NavLink>
      <NavLink
        className="link"
        activeStyle={{
          color: "#80B14A",
        }}
        to="/about"
      >
        <MdHelp className="icon" />
        Om
      </NavLink>
    </MenuDiv>
  );
};

export default MenuBar;
