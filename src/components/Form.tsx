/* eslint-disable react/no-unused-prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import styled from "styled-components";
import { IFields } from "../interfaces/IForm";
// import { options } from "../utils/formUtils";

const FormContainerDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 150px;

  form {
    display: flex;
    flex-direction: column;
  }
  section {
    background-color: ${(props) => props.theme.formTheme.backgroundColor};
    width: 350px;
    height: 56px;
    border-radius: 4.5px;
    padding: 16px 0px 16px 16px;
    margin: 8px 0px;
    p {
      margin-block-end: 0;
      margin-block-start: 0;
    }
  }

  .allDiv {
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

    .required {
      font-style: italic;
      color: red;
      font-size: 10px;
    }
  }
`;
export default function Form(props: {
  values: any;
  fields: IFields[];
  mutation: string;
  handleInputChange: (event: React.ChangeEvent<any>) => void;
  handleCheckboxChange: (event: React.ChangeEvent<any>, data: any) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}) {
  const fields = props.fields.map((field: IFields) => {
    if (field.fieldType === "input" && field.dataType !== "checkbox") {
      return (
        <section className="allDiv" key={field.name}>
          {field.required && <span className="required">obligatorisk</span>}
          <label htmlFor={field.name}>{field.title}</label>
          <input
            type={field.dataType}
            name={field.name}
            onChange={props.handleInputChange}
            value={props.values[field.name]}
            placeholder={field.title}
            disabled={field.disabled}
            required={field.required}
          />
        </section>
      );
    }
    if (field.fieldType === "input" && field.dataType === "checkbox") {
      const data = field.option ? field.option : [];
      const checkboxInput = data.map((x: any) => {
        return (
          <React.Fragment key={x.name}>
            <label htmlFor={x.name}>{x.swe ? x.swe[0] : x.name}</label>
            <input
              type={field.dataType}
              name={x.name}
              onChange={(e) => props.handleCheckboxChange(e, field.name)}
              checked={props.values[field.name][x.name]}
              disabled={x.disabled}
            />
          </React.Fragment>
        );
      });
      return (
        <section key={field.name}>
          <p>{field.title}</p>
          <div className="allDiv">
            {field.required && <span className="required">obligatorisk</span>}
            {checkboxInput}
          </div>
        </section>
      );
    }
    if (field.fieldType === "textarea") {
      return (
        <section className="allDiv" key={field.name}>
          {field.required && <span className="required">obligatorisk</span>}
          <label htmlFor={field.name}>{field.title}</label>
          <textarea
            name={field.name}
            onChange={props.handleInputChange}
            value={props.values[field.name]}
            placeholder={field.title}
            required={field.required}
          />
        </section>
      );
    }
    if (field.fieldType === "select") {
      const data = field.eng ? field.eng : [];
      return (
        <section className="allDiv" key={field.name}>
          {field.required && <span className="required">obligatorisk</span>}
          <label htmlFor={field.name} key={field.name}>
            {field.title}
          </label>
          <select
            name={field.name}
            id={field.name}
            onChange={props.handleInputChange}
            defaultValue={
              props.values[field.name] ? props.values[field.name] : "select"
            }
            required={field.required}
          >
            <option value="select" disabled>
              Välj ett alternativ
            </option>
            {data.map((x: string, idx: number) => {
              return (
                <option value={x} key={x}>
                  {field.swe ? field.swe[idx] : x}
                </option>
              );
            })}
          </select>
        </section>
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
