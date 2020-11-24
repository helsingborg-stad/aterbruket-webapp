import React, { FC } from "react";
import styled from "styled-components";
import { RiArrowRightSLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const OptionLink = styled(Link)`
  width: 100%;
  height: 60px;
  display: flex;
  font-weight: 500;
  font-size: 24px;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 16px;
  background-color: #e1e9db;
  color: #205400;
  text-decoration: none;
  border: 1px solid grey;

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
      {menuOptions.map((opt: any) => {
        return (
          <OptionLink to={`/profile/${opt.option}`} key={opt.option}>
            <p>{opt.title}</p> <RiArrowRightSLine />
          </OptionLink>
        );
      })}
    </main>
  );
};

export default Profile;
