import { withAuthenticator } from "@aws-amplify/ui-react";
import React, { FC } from "react";
import styled, { ThemeProvider } from "styled-components";
import "./App.css";
import { UserProvider } from "./contexts/UserContext";
import RootRouter from './routes/RootRouter';
import theme from "./styles/theme";
import ReactPWAInstallProvider, { useReactPWAInstall } from "react-pwa-install";

const AppContainer = styled.div`
  min-height: ${(props) => `${props.theme.appTheme.minHeight}vh`};
  min-width: ${(props) => `${props.theme.appTheme.minWidth}px`};
  width: ${(props) => `${props.theme.appTheme.width}%`};
  padding: ${(props) =>
    `${props.theme.appTheme.padding[0]}rem ${props.theme.appTheme.padding[1]}rem ${props.theme.appTheme.padding[2]}rem ${props.theme.appTheme.padding[3]}rem`};
  box-sizing: ${(props) => props.theme.appTheme.boxSizing};
  background-color: ${(props) => props.theme.appTheme.primaryColor};
  font-family: ${(props) => props.theme.appTheme.fontFamily};
  display: flex;
  flex-direction: column;
  align-items: center;
  main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 65px;
  }
`;

const App: FC = () => {
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();
  const handleClick = () => {
    pwaInstall({
      title: "Installera Haffa",
      description: "Haffa kommer hamna på din hemskärm som en app.",
    })
      .then()
      .catch(() => alert("Ladda gärna ner den nästa gång du använder Haffa."));
  };
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <AppContainer>
          <RootRouter />
          {supported() && !isInstalled() && (
            <button type="button" onClick={handleClick}>
              Lägg Haffa på hemskärmen
            </button>
          )}
        </AppContainer>
      </ThemeProvider>
    </UserProvider>
  );
};

export default withAuthenticator(App);
