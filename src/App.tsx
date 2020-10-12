import React, { FC } from "react";
import { Redirect, Route, BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";

import "./App.css";
import { theme } from "./styles/theme";
import Home from "./pages/Home";
import Header from "./components/Header";
import AddItem from "./pages/AddItem";
import ItemDetails from "./pages/ItemDetails";

const AppContainer = styled.div`
  min-height: ${(props) => `${props.theme.minHeight}vh`};
  min-width: ${(props) => `${props.theme.minWidth}px`};
  width: ${(props) => `${props.theme.width}vw`};
  padding: ${(props) =>
    `${props.theme.padding[0]}rem ${props.theme.padding[1]}rem`};
  box-sizing: ${(props) => props.theme.boxSizing};
  background-color: ${(props) => props.theme.secondaryColor};
  display: flex;
  flex-direction: column;
  align-items: center;

  main {
    border: 1px black solid;
    min-width: 100%;
  }
`;

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Router>
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/add" component={AddItem} />
          <Route path="/item/:id" component={ItemDetails} />
        </Router>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
