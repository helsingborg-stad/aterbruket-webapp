import React, { FC } from "react";
import styled from "styled-components";
import { RiArrowRightSLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const OptionsDiv = styled.div`
  width: 90%;
  max-width: 700px;
  margin-top: 60px;
`;

const OptionLink = styled(Link)`
  width: 100%;
  display: flex;
  font-weight: 500;
  font-size: 18px;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 16px;
  margin-top: 10px;
  background-color: #e1e9db;
  color: ${(props) => props.theme.colors.primaryDark};
  text-decoration: none;
  height: 50px;
  border-radius: 14.5px;
  box-shadow: 0px 0px 2px rgba(98, 98, 98, 0.18),
    0px 3px 2px rgba(98, 98, 98, 0.12), 0px 6px 8px rgba(98, 98, 98, 0.12),
    0px 10px 16px rgba(98, 98, 98, 0.12), 0px 26px 32px rgba(98, 98, 98, 0.12);

  :active,
  :focus {
    color: #80b14a;
  }
`;

const Profile: FC = () => {
  const menuOptions = [
    {
      option: "personal-info",
      title: "Kontaktuppgifter",
    },
    { option: "myadverts", title: "Mina annonser" },

    { option: "statics", title: "Haffa statics" },
  ];

  return (
    <main>
      <OptionsDiv>
        {menuOptions.map((opt: any) => {
          return (
            <OptionLink to={`/profile/${opt.option}`} key={opt.option}>
              <p>{opt.title}</p> <RiArrowRightSLine />
            </OptionLink>
          );
        })}
      </OptionsDiv>
    </main>
  );
};

export default Profile;
