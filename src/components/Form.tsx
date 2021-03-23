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
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  section {
    background-color: ${(props) => props.theme.formTheme.backgroundColor};
    width: 90%;
    height: 56px;
    border-radius: 4.5px;
    padding: 16px 5px 16px 16px;
    margin: 8px 0px;
    p {
      margin-block-end: 0;
      margin-block-start: 0;
    }
  }
  .labelP {
    color: ${(props) => props.theme.cardTheme.descColor};
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    letter-spacing: 0.005em;
  }

  .allDiv {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row-reverse;

    input,
    textarea,
    select {
      border-radius: 4.5px;
      border: none;
      font-size: 16px;
    }
    .validationInfo {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 5px;
      .required {
        font-style: italic;
        color: red;
        font-size: 10px;
      }
      .infoSpan {
        color: grey;
        font-style: italic;
        font-size: 10px;
      }
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
    const dimensions = ["width", "height", "length"];

    if (field.fieldType === "input" && field.dataType !== "checkbox") {
      const attributes: any = {
        type: field.dataType,
        name: field.name,
        onChange: props.handleInputChange,
        placeholder: field.title,
        disabled: field.disabled,
        required: field.required,
      };

      if (props.values[field.name] !== undefined) {
        attributes.value = props.values[field.name];
      }
      if (dimensions.includes(field.name) || field.name === "phoneNumber") {
        attributes.pattern = "[0-9]*";
      }

      return (
        <section className="allDiv" key={field.name}>
          <div className="validationInfo">
            {field.required && <span className="required">obligatorisk</span>}
            {field.name === "location" && (
              <span className="infoSpan">ex, Drottninggatan 14</span>
            )}
            {dimensions.includes(field.name) && (
              <span className="infoSpan">ange i cm</span>
            )}
            {field.name === "phoneNumber" && (
              <span className="infoSpan">
                ange endast siffror <br />
                ex, 0701234567
              </span>
            )}
          </div>
          <input {...attributes} />
          <label htmlFor={field.name}>
            <p className="labelP">{field.title}</p>
          </label>
        </section>
      );
    }
    if (field.fieldType === "input" && field.dataType === "checkbox") {
      const data = field.option ? field.option : [];
      const checkboxInput = data.map((x: any) => {
        return (
          <React.Fragment key={x.name}>
            <div>
              <label htmlFor={x.name}>
                <p className="labelP">{x.swe ? x.swe[0] : x.name}</p>
              </label>
              <input
                type={field.dataType}
                name={x.name}
                onChange={(e) => props.handleCheckboxChange(e, field.name)}
                checked={props.values[field.name][x.name]}
                disabled={x.disabled}
              />
            </div>
          </React.Fragment>
        );
      });
      return (
        <section key={field.name}>
          <p className="labelP">{field.title}</p>
          <div className="allDiv">
            <div className="validationInfo">
              {field.required && <span className="required">obligatorisk</span>}
              <span className="infoSpan">välj en eller flera</span>
            </div>
            {checkboxInput}
          </div>
        </section>
      );
    }
    if (field.fieldType === "textarea") {
      return (
        <section className="allDiv" key={field.name}>
          <div className="validationInfo">
            {field.required && <span className="required">obligatorisk</span>}{" "}
            <span className="infoSpan">max 200 tecken</span>
          </div>
          <textarea
            name={field.name}
            onChange={props.handleInputChange}
            value={props.values[field.name]}
            placeholder={field.title}
            required={field.required}
            maxLength={200}
          />
          <label htmlFor={field.name}>
            <p className="labelP">{field.title}</p>
          </label>
        </section>
      );
    }
    if (field.fieldType === "select") {
      const data = field.eng ? field.eng : [];
      return (
        <section className="allDiv" key={field.name}>
          <div className="validationInfo">
            {field.required && <span className="required">obligatorisk</span>}
          </div>

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
          <label htmlFor={field.name} key={field.name}>
            <p className="labelP">{field.title}</p>
          </label>
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
