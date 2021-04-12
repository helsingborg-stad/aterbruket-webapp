import { withAuthenticator } from "@aws-amplify/ui-react";
import React, { FC, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
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

const RootRouter: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [alreadyAQRCode, setAlreadyAQRCode] = useState(false);
  const [qrCamera, setQrCamera] = useState({ delay: 500, result: "" });

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default withAuthenticator(RootRouter);
