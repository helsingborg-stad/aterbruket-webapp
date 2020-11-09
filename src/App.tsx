/* eslint-disable import/no-named-as-default-member */
import React, { FC, useContext, useEffect, useState } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import "./App.css";
import theme from "./styles/theme";
import Home from "./pages/Home";
import Header from "./components/Header";
import AddItem from "./pages/AddItem";
import ItemDetails from "./pages/ItemDetails";
import Profile from "./pages/Profile";
import MenuBar from "./components/MenuBar";
import Admin from "./pages/Admin";
import { UserContext } from "./contexts/UserContext";

const AppContainer = styled.div`
  min-height: ${(props) => `${props.theme.appTheme.minHeight}vh`};
  min-width: ${(props) => `${props.theme.appTheme.minWidth}px`};
  width: ${(props) => `${props.theme.appTheme.width}vw`};
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

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((user) => {
      setUser(user);
    });
  }, []);

  return (
    <UserContext.Provider value={user}>
      <ThemeProvider theme={theme}>
        <AppContainer>
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
              <Route path="/profile" component={Profile} />
              <Route path="/item/:id" component={ItemDetails} />
              <Route path="/admin" component={Admin} />
            </UserContext.Provider>
            <MenuBar />
          </Router>
        </AppContainer>
      </ThemeProvider>
    </UserContext.Provider>
  );
};

export default withAuthenticator(App);
