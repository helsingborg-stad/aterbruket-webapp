/* eslint-disable no-nested-ternary */
import React, { FC } from "react";
import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";
import { RiArrowLeftSLine } from "react-icons/ri";

const HeaderDiv = styled.header`
  width: ${(props) => `${props.theme.headerTheme.width}%`};
  height: ${(props) => `${props.theme.headerTheme.height}px`};
  display: ${(props) => props.theme.headerTheme.display};
  flex-direction: ${(props) => props.theme.headerTheme.flexDirection};
  align-items: ${(props) => props.theme.headerTheme.alignItems};
  justify-content: ${(props) => props.theme.headerTheme.justifyContent};
  padding: ${(props) =>
    `${props.theme.headerTheme.padding[0]}px ${props.theme.headerTheme.padding[1]}px ${props.theme.headerTheme.padding[2]}px ${props.theme.headerTheme.padding[3]}px`};
  background-color: ${(props) => props.theme.headerTheme.backgroundColor};
  box-sizing: border-box;

  h2 {
    font-style: ${(props) => props.theme.headerTheme.fontStyle};
    font-weight: ${(props) => props.theme.headerTheme.fontWeight};
    font-size: ${(props) => `${props.theme.headerTheme.fontSize}px`};
    line-height: ${(props) => `${props.theme.headerTheme.lineHeight}%`};
  }
`;

const MenuLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  line-height: 20px;
  font-size: 20px;
  padding: 0;
  color: #205400;

  p {
    margin-left: 10px;
  }

  .icon {
    font-size: 22px;
  }
`;

const Header: FC = () => {
  const location = useLocation();
  const path = location.pathname.slice(1);
  const subPath = location.pathname.slice(9);

  return (
    <HeaderDiv>
      {subPath === "personal-info" ||
      subPath === "myadverts" ||
      subPath === "statics" ? (
        <MenuLink to="/profile">
          <RiArrowLeftSLine className="icon" />
          <p>Meny</p>
        </MenuLink>
      ) : null}
      <h2>
        {subPath === "personal-info"
          ? "Kontaktuppgifter"
          : subPath === "myadverts"
          ? "Mina annonser"
          : subPath === "statics"
          ? "Haffa statics"
          : path === "haffat"
          ? "Grejer du Haffat!"
          : "Haffa och var en miljöhjälte!"}
      </h2>
    </HeaderDiv>
  );
};

export default Header;
