/* eslint-disable react/destructuring-assignment */
import React, { FC } from "react";

interface IObj {
  text: string;
}

const Try = (props: { Obj: IObj }) => {
  return <p>{props.Obj.text}</p>;
};

export default Try;
