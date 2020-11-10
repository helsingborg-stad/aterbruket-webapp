import React, { FC } from "react";
import styled from "styled-components";

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

  a {
    text-decoration: none;
  }
  a:visited {
    color: black;
  }
`;


const Header: FC = () => {
  return (
    <HeaderDiv>
      <h2>
        Haffa och var en <br />
        miljöhjälte!
      </h2>
      
    </HeaderDiv>
  );
};

export default Header;