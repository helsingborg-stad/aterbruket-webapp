import React, { FC, useContext } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { Auth } from 'aws-amplify';

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
`;

const SignOutButton = styled.button`
  background: #50811B;
  border-radius: 4.5px;
  border: none;
  color: white;
  font-size: 14px;
  padding: 12px 24px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 24px;
`;

const PersonalInfo: FC = () => {
  const { user } = useContext(UserContext);

  return (
    <main>
      <h2> {user.name} </h2>
      <InformationContainer>
        {user.name &&
          <>
            <InformationHeader>Namn</InformationHeader>
            <InformationFrame>{user.name}</InformationFrame>
          </>
        }
        {user.department &&
          <>
            <InformationHeader>Avdelning</InformationHeader>
            <InformationFrame>{user.department}</InformationFrame>
          </>
        }
        {user.email &&
          <>
            <InformationHeader>Email</InformationHeader>
            <InformationFrame>{user.email}</InformationFrame>
          </>
        }
        {user.address &&
          <>
            <InformationHeader>Adress</InformationHeader>
            <InformationFrame>{user.address}</InformationFrame>
          </>
        }
        {user.postalcode &&
          <>
            <InformationHeader>Postnummer</InformationHeader>
            <InformationFrame>{user.postalcode}</InformationFrame>
          </>
        }
      </InformationContainer>

      <SignOutButton onClick={() => { Auth.signOut() }}>Logga ut</SignOutButton>

    </main>
  );
};

export default PersonalInfo;
