import React, { FC } from "react";
import { Redirect, Route, BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import "./App.css";
import { lightTheme } from "./styles/theme";
import Home from "./pages/Home";
import Header from "./components/Header";
import AddItem from "./pages/AddItem";
import ItemDetails from "./pages/ItemDetails";

const App: FC = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <div className="App">
        <Router>
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/add" component={AddItem} />
          <Route path="/item/:id" component={ItemDetails} />
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
