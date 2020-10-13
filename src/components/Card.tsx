import React, { FC } from "react";

interface Props {
  title: string;
  description: string;
  width: number;
}

const Card = (props: Props) => {
  return (
    <div>
      <h2>{props.title}</h2>

      <p>{props.description}</p>

      <p>{props.width}</p>
    </div>
  );
};

export default Card;
