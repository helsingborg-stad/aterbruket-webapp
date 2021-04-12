import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MdHome, MdCloud, MdChat, MdPerson } from "react-icons/md";

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
    :active,
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
      <Link
        className="link"
        to="/app"
        onClick={() => setQrCamera({ ...qrCamera, result: "" })}
      >
        <MdHome className="icon" />
        Hem
      </Link>
      <Link className="link" to="/haffat">
        <MdCloud className="icon" />
        Haffat
      </Link>
      <Link className="link" to="/message">
        <MdChat className="icon" />
        Meddelenden
      </Link>
      <Link className="link" to="/profile">
        <MdPerson className="icon" />
        Profile
      </Link>
    </MenuDiv>
  );
};

export default MenuBar;
