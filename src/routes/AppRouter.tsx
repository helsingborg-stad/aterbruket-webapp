import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import React, { FC, useState } from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";
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
import SignIn from "../pages/SignIn";
import StartScreen from "../pages/StartScreen";
import HbgLogo from "../pics/HBG_logo_sm.png";
import BG from "../pics/onboarding_bg_x2.png";

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

const Title = styled.h1`
  font-size: 36px;
  font-weight: 900;
  color: #000;
  margin: 0px 0px 16px 0px;
`;

const SubTitle = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: #205400;
  margin: 0px;
`;

const Text = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #3d3d3d;
  line-height: 27px;
  margin: 0px 0px 16px 0px;
`;

const Logo = styled.img`
  width: 34px;
  margin-bottom: 26px;
`;

const SignInWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  -webkit-background-size: cover;
  background-size: cover;
  background-position: center;
  background-image: url(${BG});
`;

const SignInContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 500px;
`;

const Separator = styled.div`
  width: 32px;
  height: 2px;
  margin: 16px 0;
  background-color: #e1e9db;
  border-radius: 10px;
`;

const AppRouter: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [alreadyAQRCode, setAlreadyAQRCode] = useState(false);
  const [qrCamera, setQrCamera] = useState({ delay: 500, result: "" });

  return (
    <AmplifyAuthenticator>
      <SignInWrapper slot="sign-in">
        <SignInContent>
          <SignIn>
            <Logo src={HbgLogo} alt="Logo" />
            <SubTitle>En delningsplattform.</SubTitle>
            <Separator />
            <Title>Haffa!</Title>
            <Text>
              Logga in med ditt vanliga jobbkonto - ingen registrering behövs.
            </Text>
          </SignIn>
        </SignInContent>
      </SignInWrapper>
      <AppContainer>
        <Header isInDetail={false} />
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
};

export default AppRouter;
