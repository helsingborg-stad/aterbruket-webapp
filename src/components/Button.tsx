/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from "react";
import styled from "styled-components";

type ButtonProps = {
  transparent?: boolean;
  secondary?: boolean;
  shadow?: boolean;
  size?: "sm" | "md" | "lg";
} & React.ComponentPropsWithoutRef<"button">;

const ButtonComponent = styled.button<ButtonProps>`
  background: #50811b;
  border-radius: 4.5px;
  border: none;
  color: white;
  font-size: 14px;
  padding: 12px 24px;
  cursor: pointer;
  font-weight: 500;
  ${({ size }) =>
    size === "sm" &&
    `
      font-size: 12px;
      padding: 8px 12px;
  `}
  ${({ size }) =>
    size === "lg" &&
    `
    font-size: 16px;
    padding: 16px 32px;
  `}
  ${({ secondary }) =>
    secondary &&
    `
      color: #205400;
      background: #E1E9DB;
      font-weight: 700;
  `}
 ${({ transparent }) =>
    transparent &&
    `
      color: #565656;
      background: transparent;
      box-shadow: none;
  `}
  ${({ shadow }) =>
    shadow &&
    `
      box-shadow: 0px 0px 2px rgba(98, 98, 98, 0.18), 0px 3px 2px rgba(98, 98, 98, 0.12), 0px 6px 8px rgba(98, 98, 98, 0.12), 0px 10px 16px rgba(98, 98, 98, 0.12), 0px 26px 32px rgba(98, 98, 98, 0.12);
  `}
`;

const Button: FC<ButtonProps> = ({
  size,
  secondary,
  transparent,
  shadow,
  children,
  ...props
}) => {
  return (
    <ButtonComponent
      size={size}
      secondary={secondary}
      transparent={transparent}
      shadow={shadow}
      {...props}
    >
      {children}
    </ButtonComponent>
  );
};

export default Button;
