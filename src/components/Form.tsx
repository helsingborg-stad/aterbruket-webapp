/* eslint-disable react/no-unused-prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import styled from "styled-components";
import { IFields } from "../interfaces/IForm";
import { options } from "../util/utils";

const FormContainerDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
  }

  .allDiv {
    background-color: ${(props) => props.theme.formTheme.backgroundColor};
    width: 350px;
    height: 56px;
    border-radius: 4.5px;
    padding: 16px 0px 16px 16px;
    margin: 8px 0px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: row-reverse;

    label {
      margin: 0px 8px;
    }

    input,
    textarea,
    select {
      border-radius: 4.5px;
      border: none;
    }
  }
`;

export default function Form(props: {
  values: any;
  fields: IFields[];
  mutation: string;
  handleInputChange: (event: React.ChangeEvent<any>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}) {
  const fields = props.fields.map((field: IFields) => {
    if (field.fieldType === "input" && field.dataType !== "checkbox") {
      return (
        <div className="allDiv" key={field.name}>
          <label htmlFor={field.name}>{field.name}</label>
          <input
            type={field.dataType}
            name={field.name}
            onChange={props.handleInputChange}
            value={props.values[field.name]}
            placeholder={field.name}
            disabled={field.disabled}
          />
        </div>
      );
    }
    if (field.fieldType === "input" && field.dataType === "checkbox") {
      const checkboxInput = options[field.name].map((x: string) => {
        return (
          <React.Fragment key={x}>
            <label htmlFor={field.name}>{x}</label>
            <input
              type={field.dataType}
              name={field.name}
              onChange={props.handleInputChange}
              value={x}
              disabled={field.disabled}
            />
          </React.Fragment>
        );
      });
      return (
        <div className="allDiv" key={field.name}>
          {checkboxInput}
        </div>
      );
    }
    if (field.fieldType === "textarea") {
      return (
        <div className="allDiv" key={field.name}>
          <label htmlFor={field.name}>{field.name}</label>
          <textarea
            name={field.name}
            onChange={props.handleInputChange}
            value={props.values[field.name]}
            placeholder={field.name}
          />
        </div>
      );
    }
    if (field.fieldType === "select") {
      return (
        <div className="allDiv" key={field.name}>
          <label htmlFor={field.name} key={field.name}>
            Choose {field.name}:
          </label>
          <select
            name={field.name}
            id={field.name}
            onClick={props.handleInputChange}
          >
            {options[field.name].map((x: string) => {
              return (
                <option value={x} key={x}>
                  {x}
                </option>
              );
            })}
          </select>
        </div>
      );
    }
  });

  return (
    <FormContainerDiv>
      <form onSubmit={props.handleSubmit}>
        {fields}
        <button type="submit">Submit</button>
      </form>
    </FormContainerDiv>
  );
}
