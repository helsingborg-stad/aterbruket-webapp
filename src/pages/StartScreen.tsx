import React, { FC, useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { Redirect } from "react-router-dom";

const StartScreen: FC = () => {
  const [redirect, setRedirect] = useState<string | null>(null);

  const showOnboardingScreen = localStorage.getItem('HaffaApp:showOnboardingScreen');

  useEffect(() => {
    const redirectUser = async () => {
      await Auth.currentAuthenticatedUser()
        .then(() => {
          setRedirect('app');
        })
        .catch(() => {
          setRedirect(showOnboardingScreen === 'false' ? 'app' : 'onboarding');
        });
    }

    redirectUser();
  }, []);

  if (redirect) {
    return <Redirect to={redirect} />
  }

  return <div>Loading...</div>;
};

export default StartScreen;
