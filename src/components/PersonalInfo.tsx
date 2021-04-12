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
  const user: any = useContext(UserContext);
  const userKeys = Object.keys(user.attributes);
  const userInfo = userKeys.map((key) => {
    return (
      <div key={key}>
        {key === "email_verified" ? null : (
          <>
            <InformationHeader> {key} </InformationHeader>
            <InformationFrame>{user.attributes[key]}</InformationFrame>
          </>
        )}
      </div>
    );
  });
  return (
    <main>
      <h2> {user.attributes.name} </h2>
      <InformationContainer>
        {userInfo}
        <InformationHeader>DEPARTMENT</InformationHeader>
        {!user["custom:department"] ? (
          <InformationFrame>Kan inte hitta avdelning..</InformationFrame>
        ) : (
          <InformationFrame>{user["custom:department"]}</InformationFrame>
        )}
      </InformationContainer>
    </main>
  );
};

export default PersonalInfo;
