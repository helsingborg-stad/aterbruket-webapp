import React, { FC } from "react";

interface Props {
  title: string;
  description: string;
}

const Card = (props: Props) => {
  return (
    <div>
      <h2>{props.title}</h2>

      <p>{props.description}</p>
    </div>
  );
};

export default Card;
