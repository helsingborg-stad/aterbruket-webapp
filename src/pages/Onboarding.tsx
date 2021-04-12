import React from "react";
import { AmplifySignOut } from "@aws-amplify/ui-react";

const Onboarding: React.FC = () => {
  return (
    <div>
      <div>Onboarding</div>
      <AmplifySignOut />
    </div>
  );
};

export default Onboarding;
