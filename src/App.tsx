import React, { FC, useState } from "react";
import { Redirect, Route, BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import AddItem from "./pages/AddItem";
import ItemDetails from "./pages/ItemDetails";

const App: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="App">
      <Router>
        <Header modalOpen={modalOpen} setModalOpen={setModalOpen} />
        <Route exact path="/" component={Home} />
        <Route path="/add" component={AddItem} />
        <Route path="/item/:id" component={ItemDetails} />
      </Router>
    </div>
  );
};

export default App;
