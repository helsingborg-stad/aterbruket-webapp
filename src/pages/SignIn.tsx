
import React, { FC } from "react";
import { AmplifySignIn } from "@aws-amplify/ui-react";
import { withRouter } from 'react-router-dom';

const SignIn: FC = ({ children }) => {
  return (
    <div slot="sign-in">
      {children}
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
    </div>
  );
}

export default withRouter(SignIn);
