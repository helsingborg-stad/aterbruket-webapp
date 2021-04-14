import React, { FC, useState } from "react";
import { Route } from "react-router-dom";
import Header from "../components/Header";
import MenuBar from "../components/MenuBar";
import MyAdverts from "../components/MyAdverts";
import PersonalInfo from "../components/PersonalInfo";
import Statics from "../components/Statics";
import AddItem from "../pages/AddItem";
import Haffat from "../pages/Haffat";
import Home from "../pages/Home";
import ItemDetails from "../pages/ItemDetails";
import Onboarding from "../pages/Onboarding";
import Profile from "../pages/Profile";
import StartScreen from "../pages/StartScreen";
import SignIn from "../pages/SignIn";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import styled from "styled-components";

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

const AppRouter: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [alreadyAQRCode, setAlreadyAQRCode] = useState(false);
  const [qrCamera, setQrCamera] = useState({ delay: 500, result: "" });

  return (
    <AmplifyAuthenticator>
      <SignIn />
      <AppContainer>
        <Header />
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
      </AppContainer>
    </AmplifyAuthenticator>
  );
}

export default AppRouter;
