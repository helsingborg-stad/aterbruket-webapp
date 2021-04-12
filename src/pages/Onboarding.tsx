import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const Onboarding: React.FC = () => {

  const [isOnboardingDisabled, setIsOnboardingDisabled] = useState<boolean>(false);

  const disableOnboarding = () => {
    localStorage.setItem('HaffaApp:showOnboardingScreen', 'false');
    setIsOnboardingDisabled(true);
  }

  if (isOnboardingDisabled) {
    return <Redirect to="app" />
  }

  return (
    <div>
      <div>Onboarding screen</div>
      <a href="#" onClick={disableOnboarding}>Disable onboarding</a>
    </div>
  );
};

export default Onboarding;
