import React, { FC, useContext } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";

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
  height: 100vh;
  background: #fcfcfc;
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
    </main>
  );
};

export default PersonalInfo;
