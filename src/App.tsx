import React, { FC } from "react";
import { Redirect, Route, BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";

import "./App.css";
import { lightTheme } from "./styles/theme";
import Home from "./pages/Home";
import Header from "./components/Header";
import AddItem from "./pages/AddItem";
import ItemDetails from "./pages/ItemDetails";

const AppContainer = styled.div`
  background-color: ${(props) => props.theme.secondaryColor};
  /* width: ${(props) => `${props.theme.width}px`}; */
  height: ${(props) => `${props.theme.height}px`};
  /* min-width: ${(props) => `${props.theme.minWidth}px`}; */
  max-width: ${(props) => `${props.theme.maxWidth}px`};

  box-sizing: ${(props) => props.theme.boxSizing};
  /* padding: 10px; */
`;

const App: FC = () => {
  return (
    <ThemeProvider theme={lightTheme}>
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
