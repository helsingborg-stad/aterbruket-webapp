import React, { FC, useState } from "react";
import { Redirect, Route, BrowserRouter as Router } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import "./App.css";
import theme from "./styles/theme";
import Home from "./pages/Home";
import Header from "./components/Header";
import AddItem from "./pages/AddItem";
import ItemDetails from "./pages/ItemDetails";
import AdvertContainer from "./components/AdvertContainer"
import AdvertForm from "./components/Form"
import { createAdvertisement } from "./graphql/mutations";

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
  const [modalOpen, setModalOpen] = useState(false);

  const fields  = [
    {
      name: 'title',
      dataType: 'text',
      fieldType: 'input'
    },
    {
      name: 'width',
      dataType: 'number',
      fieldType: 'input'
    },
    {
      name: 'description',
      fieldType: 'textarea'
    }
  ]
  
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Router>
          <Header modalOpen={modalOpen} setModalOpen={setModalOpen} />
          <Route exact path="/" component={Home} />
          <Route exact path="/add" component={AddItem} />
          <Route path="/item/:id" component={ItemDetails} />
        </Router>
        <AdvertForm fields={fields} mutation={createAdvertisement}/>
        <AdvertContainer/>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
