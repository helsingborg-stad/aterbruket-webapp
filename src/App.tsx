/* eslint-disable import/no-named-as-default-member */
import React, { FC, useState } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "./App.css";
import theme from "./styles/theme";
import Home from "./pages/Home";
import Header from "./components/Header";
import AddItem from "./pages/AddItem";
import ItemDetails from "./pages/ItemDetails";
import Profile from "./pages/Profile";
import Haffat from "./pages/Haffat";
import Onboarding from "./pages/Onboarding";
import StartScreen from "./pages/StartScreen";
import MenuBar from "./components/MenuBar";
import { UserProvider } from "./contexts/UserContext";
import PersonalInfo from "./components/PersonalInfo";
import Statics from "./components/Statics";
import MyAdverts from "./components/MyAdverts";
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
  const [modalOpen, setModalOpen] = useState(false);
  const [alreadyAQRCode, setAlreadyAQRCode] = useState(false);
  const [qrCamera, setQrCamera] = useState({ delay: 500, result: "" });
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
          {supported() && !isInstalled() && (
            <button type="button" onClick={handleClick}>
              Lägg Haffa på hemskärmen
            </button>
          )}
          <Router>
            <Header isInDetail={false} />
            <Route exact path="/" component={StartScreen} />
            <Route exact path="/onboarding" component={Onboarding} />
            <Route
              exact
              path="/app"
              component={() => (
                <Home
                  modalOpen={modalOpen}
                  setModalOpen={setModalOpen}
                  setAlreadyAQRCode={setAlreadyAQRCode}
                  qrCamera={qrCamera}
                  setQrCamera={setQrCamera}
                />
              )}
            />
            <Route
              path="/add"
              component={() => (
                <AddItem
                  alreadyAQRCode={alreadyAQRCode}
                  qrCamera={qrCamera}
                  setQrCamera={setQrCamera}
                />
              )}
            />
            <Route path="/haffat" component={Haffat} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/profile/personal-info" component={PersonalInfo} />
            <Route path="/profile/statics" component={Statics} />
            <Route path="/profile/myadverts" component={MyAdverts} />
            <Route path="/item/:id" component={ItemDetails} />
            <MenuBar setQrCamera={setQrCamera} qrCamera={qrCamera} />
          </Router>
        </AppContainer>
      </ThemeProvider>
    </UserProvider>
  );
};

export default withAuthenticator(App);
