/* eslint-disable no-nested-ternary */
import React, { FC, useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { useReactPWAInstall } from "react-pwa-install";
import { useCallback } from "react";

interface MyProps {
  isHidden: boolean;
}

const HeaderDiv = styled.header`
  width: ${(props) => `${props.theme.headerTheme.width}vw`};
  flex-direction: ${(props) => props.theme.headerTheme.flexDirection};
  align-items: ${(props) => props.theme.headerTheme.alignItems};
  justify-content: ${(props) => props.theme.headerTheme.justifyContent};
  padding: ${(props) =>
    `${props.theme.headerTheme.padding[0]}px ${props.theme.headerTheme.padding[1]}px ${props.theme.headerTheme.padding[2]}px ${props.theme.headerTheme.padding[3]}px`};
  background-color: ${(props) => props.theme.headerTheme.backgroundColor};
  display: ${(props: MyProps) => (props.isHidden ? "none" : "flex")};
  position: fixed;
  z-index: 10;
  transition: all 0.2s;

  h2 {
    font-style: ${(props) => props.theme.headerTheme.fontStyle};
    font-weight: ${(props) => props.theme.headerTheme.fontWeight};
    font-size: ${(props) => `${props.theme.headerTheme.fontSize}px`};
    line-height: ${(props) => `${props.theme.headerTheme.lineHeight}%`};
    color: ${(props) => props.theme.colors.darkest};
  }
`;

const MenuLink = styled(Link)`
  color: ${(props) => props.theme.colors.dark};
  position: absolute;
  top: 12px;
  left: 20px;

  .icon {
    font-size: 22px;
  }
`;

const InstallButton = styled.button`
  margin: 0 auto;
`;

const Header: FC<MyProps> = () => {
  const location = useLocation();
  const path = location.pathname.slice(1);
  const subPath = location.pathname.slice(9);
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = useCallback(() => {
    // find current scroll position
    const currentScrollPos = window.pageYOffset;

    // set state based on location info
    setVisible(
      (prevScrollPos > currentScrollPos &&
        prevScrollPos - currentScrollPos > 70) ||
        currentScrollPos < 100
    );

    // set state to new scroll position
    setPrevScrollPos(currentScrollPos);
  }, [prevScrollPos]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, handleScroll]);

  useEffect(() => {
    const button: HTMLElement | null = document.getElementById("scanBtn");
    if (button) {
      if (!visible) {
        button.style.top = "5vh";
      } else {
        button.style.top = "13vh";
      }
    }
  }, [visible]);

  const handleClick = () => {
    pwaInstall({
      title: "Installera Haffa",
      description: "Haffa kommer hamna på din hemskärm som en app.",
    })
      .then()
      .catch(() => alert("Ladda gärna ner den nästa gång du använder Haffa."));
  };

  return (
    <>
      {path.includes("item") ? (
        <HeaderDiv isHidden />
      ) : (
        <HeaderDiv
          isHidden={false}
          style={{
            height: visible ? "auto" : "65px",
            alignItems: visible ? "flex-start" : "center",
            padding: visible ? "12px 0px 0px 24px" : "0",
          }}
        >
          {supported() && !isInstalled() && (
            <InstallButton
              type="button"
              onClick={handleClick}
              style={{
                display: visible ? "block" : "none",
              }}
            >
              Lägg Haffa på hemskärmen
            </InstallButton>
          )}
          {subPath === "personal-info" ||
          subPath === "myadverts" ||
          subPath === "statics" ? (
            <MenuLink to="/profile">
              <MdArrowBack className="icon" />
            </MenuLink>
          ) : null}
          <h2
            style={{
              transform: visible ? "none" : "scale(0.5)",
              marginBottom: visible ? "revert" : "12px",
            }}
          >
            {subPath === "personal-info"
              ? "Kontaktuppgifter"
              : subPath === "myadverts"
              ? "Dina grejer som kan Haffas!"
              : subPath === "statics"
              ? "Haffa statistik"
              : path === "haffat"
              ? "Grejer du Haffat!"
              : path === "add"
              ? "Gör en annons!"
              : path === "message"
              ? "Din Haffa-meddelanden (kommer i senare version...)"
              : "Haffa en möbel!"}
          </h2>
        </HeaderDiv>
      )}
    </>
  );
};

export default Header;
