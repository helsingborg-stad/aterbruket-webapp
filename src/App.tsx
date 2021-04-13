import React, { FC } from "react";
import styled, { ThemeProvider } from "styled-components";
import "./App.css";
import { UserProvider } from "./contexts/UserContext";
import RootRouter from './routes/RootRouter';
import theme from "./styles/theme";
import ReactPWAInstallProvider, { useReactPWAInstall } from "react-pwa-install";

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
        <RootRouter />
          {supported() && !isInstalled() && (
            <button type="button" onClick={handleClick}>
              Lägg Haffa på hemskärmen
            </button>
          )}
      </ThemeProvider>
    </UserProvider>
  );
};

export default App;
