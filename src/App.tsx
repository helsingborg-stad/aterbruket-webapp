/* eslint-disable import/no-named-as-default-member */
import React, { FC, useContext, useEffect, useState } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { Auth, Storage } from "aws-amplify";
import "./App.css";
import theme from "./styles/theme";
import Home from "./pages/Home";
import Header from "./components/Header";
import AddItem from "./pages/AddItem";
import ItemDetails from "./pages/ItemDetails";
import Profile from "./pages/Profile";
import Haffat from "./pages/Haffat";
import MenuBar from "./components/MenuBar";
import { UserContext } from "./contexts/UserContext";
import PersonalInfo from "./components/PersonalInfo";
import Statics from "./components/Statics";
import MyAdverts from "./components/MyAdverts";
import { v4 as uuidv4 } from "uuid";
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
  const [user, setUser] = useState({ attributes: {} }) as any;
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((user) => {
      setUser(user);
    });
  }, []);

  const handleClick = () => {
    pwaInstall({
      title: "Installera Haffa",
      description: "Haffa kommer hamna på din hemskärm som en app.",
    })
      .then(() => alert("Appen har installerats."))
      .catch(() => alert("Ladda gärna ner den nästa gång du använder Haffa."));
  };

  return (
    <UserContext.Provider value={user}>
      <ThemeProvider theme={theme}>
        <AppContainer>
          {supported() && !isInstalled() && (
            <button type="button" onClick={handleClick}>
              Install App
            </button>
          )}
          <Router>
            <Header />
            <UserContext.Provider value={user}>
              <Route
                exact
                path="/"
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
            </UserContext.Provider>
            <MenuBar setQrCamera={setQrCamera} qrCamera={qrCamera} />
          </Router>
        </AppContainer>
      </ThemeProvider>
    </UserContext.Provider>
  );
};

export default withAuthenticator(App);
