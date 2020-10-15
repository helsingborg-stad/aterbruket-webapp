import React, { FC } from "react";

interface Props {
  title: string;
  description: string;
  width: number;
  id: string
}

const Card = (props: Props) => {
  return (
    <div id={props.id}>
      <h2>{props.title}</h2>

      <p>{props.description}</p>

      <p>{props.width}</p>
    </div>
  );
};

export default Card;
