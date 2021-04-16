import React, { FC, useEffect } from "react";
import { Auth } from "aws-amplify";
import { RouteComponentProps } from "react-router-dom";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StartScreen: FC<RouteComponentProps> = ({ history }) => {
  const showOnboardingScreen = localStorage.getItem(
    "HaffaApp:showOnboardingScreen"
  );

  useEffect(() => {
    const redirectUser = async () => {
      await Auth.currentAuthenticatedUser()
        .then(() => {
          history.push("app");
        })
        .catch(() => {
          history.push(showOnboardingScreen === "false" ? "app" : "onboarding");
        });
    };
    redirectUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Loader type="Rings" color="#50811b" height={80} width={80} />
    </Container>
  );
};

export default StartScreen;
