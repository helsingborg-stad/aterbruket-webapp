import React, { FC } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AppRouter from "./AppRouter";
import Onboarding from "../pages/Onboarding";
import StartScreen from "../pages/StartScreen";

const RootRouter: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={StartScreen} />
        <Route exact path="/onboarding" component={Onboarding} />
        <Route component={AppRouter} />
      </Switch>
    </BrowserRouter>
  );
};

export default RootRouter;
