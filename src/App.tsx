/* eslint-disable import/no-named-as-default-member */
import React, { FC, useState } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import "./App.css";
import theme from "./styles/theme";
import Home from "./pages/Home";
import Header from "./components/Header";
import AddItem from "./pages/AddItem";
import ItemDetails from "./pages/ItemDetails";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";

const AppContainer = styled.div`
  min-height: ${(props) => `${props.theme.minHeight}vh`};
  min-width: ${(props) => `${props.theme.minWidth}px`};
  width: ${(props) => `${props.theme.width}vw`};
  padding: ${(props) =>
    `${props.theme.padding[0]}rem ${props.theme.padding[1]}rem ${props.theme.padding[2]}rem ${props.theme.padding[3]}rem`};
  box-sizing: ${(props) => props.theme.boxSizing};
  background-color: ${(props) => props.theme.primaryColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const App: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [alreadyAQRCode, setAlreadyAQRCode] = useState(false);
  
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Router>
          <Header
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            setAlreadyAQRCode={setAlreadyAQRCode}
          />
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/add"
            component={() => <AddItem alreadyAQRCode={alreadyAQRCode} />}
          />
          <Route path="/item/:id" component={ItemDetails} />
        </Router>
      </AppContainer>
    </ThemeProvider>
  );
};

export default withAuthenticator(App);
//export default App;
