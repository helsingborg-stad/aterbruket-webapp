
import React, { FC } from "react";
import { AmplifySignIn } from "@aws-amplify/ui-react";
import styled from "styled-components";
import { withRouter } from 'react-router-dom';

const AmplifySignInContainer = styled.div``;

const LoginContainer = styled.div``;

const SignIn: FC = () => {
  return (
    <AmplifySignInContainer slot="sign-in">
      <LoginContainer>
        <h4>En delningsplattform</h4>
        <h1>Haffa!</h1>
        <h3>Logga in med ditt vanliga jobbkonto - ingen registrering behövs. </h3>
      </LoginContainer>
      <AmplifySignIn
        headerText=""
        submitButtonText="Logga in"
        usernameAlias="username"
        hideSignUp
        formFields={[
          {
            type: "username",
            label: "Användarnamn",
            placeholder: "Ditt användarnamn",
            required: true,
          },
          {
            type: "password",
            label: "Lösenord",
            placeholder: "Fyll i ditt lösenord",
            required: true,
            hint: '' // <-- Hides forgotten password link
          },
        ]}>
      </AmplifySignIn>
    </AmplifySignInContainer>
  );
}

export default withRouter(SignIn);
