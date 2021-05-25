import React, { FC, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Auth } from "aws-amplify";
import UserContext from "../contexts/UserContext";

import Button from "../components/Button";

const InformationFrame = styled.header`
  padding: 24px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)),
    #ffffff;
  border-radius: 4.5px;
`;

const InformationHeader = styled.p`
  text-transform: uppercase;
  color: #0069b4;
`;

const InformationContainer = styled.div`
  width: 90%;
  background: #fcfcfc;
  margin-bottom: 32px;
`;

const Profile: FC = () => {
  const { user } = useContext(UserContext);

  const history = useHistory();

  const handleSignOut = async () => {
    try {
      await Auth.signOut().then(() => {
        history.push("/");
      });
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  return (
    <main>
      <h2>{user.name}</h2>
      {user.isAdmin && <strong>Administratör</strong>}
      <InformationContainer>
        {user.name && (
          <>
            <InformationHeader>Namn</InformationHeader>
            <InformationFrame>{user.name}</InformationFrame>
          </>
        )}
        {user.company && (
          <>
            <InformationHeader>Förvaltning</InformationHeader>
            <InformationFrame>{user.company}</InformationFrame>
          </>
        )}
        {user.department && (
          <>
            <InformationHeader>Avdelning</InformationHeader>
            <InformationFrame>{user.department}</InformationFrame>
          </>
        )}
        {user.email && (
          <>
            <InformationHeader>Email</InformationHeader>
            <InformationFrame>{user.email}</InformationFrame>
          </>
        )}
        {user.address && (
          <>
            <InformationHeader>Adress</InformationHeader>
            <InformationFrame>{user.address}</InformationFrame>
          </>
        )}
        {user.postalcode && (
          <>
            <InformationHeader>Postnummer</InformationHeader>
            <InformationFrame>{user.postalcode}</InformationFrame>
          </>
        )}
      </InformationContainer>

      <Button onClick={handleSignOut}>Logga ut</Button>
    </main>
  );
};

export default Profile;
