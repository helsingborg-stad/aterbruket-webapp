/* eslint-disable react/no-unused-prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import { IFields } from "../interfaces/IForm";
import Button from "./Button";
import "react-toastify/dist/ReactToastify.css";

const FormContainerDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  section {
    background-color: ${(props) => props.theme.colors.white};
    width: 90%;
    height: auto;
    border-radius: 4.5px;
    padding: 4px 16px 4px 16px;
    margin: 8px 0px;
    label {
      display: flex;
    }
    .labelP {
      color: ${(props) => props.theme.colors.primary};
      letter-spacing: 0.005em;
      padding-bottom: 2px;
      font-style: normal;
      font-weight: 900;
      font-size: 14px;
      line-height: 150%;
      text-transform: uppercase;
      margin: 0;
    }
    span {
      margin-left: 3px;
      color: ${(props) => props.theme.colors.primary};
    }

    .validationInfo {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 5px;

      .infoSpan {
        color: grey;
        font-style: italic;
        font-size: 14px;
      }
    }
  }
  .checkboxDiv {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .labelP {
      color: ${(props) => props.theme.colors.darker};
      text-transform: none;
    }
  }

  .allDiv {
    display: flex;
    //align-items: center;
    justify-content: space-around;
    flex-direction: column;

    input,
    textarea,
    select {
      border-radius: 4.5px;
      border: none;
      font-size: 16px;
      height: 56px;
      padding: 0 0 0 24px;
      background-color: ${(props) => props.theme.colors.lightGray};
      ::placeholder {
        font-style: italic;
      }
    }
    textarea {
      padding: 16px 0 0 24px;
      height: 192px;
      ::placeholder {
        font-family: "Roboto";
      }
    }
  }

  input[type="file"] {
    white-space: break-spaces;
    padding: 0;

    ::-webkit-file-upload-button {
      background: ${(props) => props.theme.colors.lightGray};
      color: black;
      width: 100%;
      height: 100%;
      border: none;
      padding: 3px;
      font-weight: 500;
      font-size: 18px;
      margin-bottom: 3px;
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
        disabled: field.disabled,
        required: field.required,
        placeholder: field.placeholder,
      };

      if (props.values[field.name] !== undefined) {
        attributes.value = props.values[field.name];
      }
      if (field.name === "title") {
        attributes.maxLength = "20";
      }
      if (
        dimensions.includes(field.name) ||
        field.name === "phoneNumber" ||
        field.name === "purchasePrice"
      ) {
        attributes.pattern = "[0-9]*";
      }

      return (
        <section className="allDiv" key={field.name}>
          <label htmlFor={field.name}>
            <p className="labelP">{field.title}</p>
            {field.required && <span className="required">*</span>}
          </label>
          <input {...attributes} />
          <div className="validationInfo">
            {field.name === "title" && (
              <span className="infoSpan">max 20 tecken</span>
            )}

            {field.name === "purchasePrice" && (
              <span className="infoSpan">
                Vet du inte exakt vad den köptes in för? <br />
                Ange då en uppskattning av priset.
              </span>
            )}
          </div>
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
          <label htmlFor={field.name}>
            <p className="labelP">{field.title}</p>{" "}
            {field.required && <span className="required">*</span>}
          </label>

          <div className="checkboxDiv">{checkboxInput}</div>
          <div className="validationInfo">
            <span className="infoSpan">välj en eller flera</span>
          </div>
        </section>
      );
    }
    if (field.fieldType === "textarea") {
      return (
        <section className="allDiv" key={field.name}>
          <label htmlFor={field.name}>
            <p className="labelP">{field.title}</p>
            {field.required && <span className="required">*</span>}
          </label>
          <textarea
            name={field.name}
            onChange={props.handleInputChange}
            value={props.values[field.name]}
            placeholder={field.placeholder}
            required={field.required}
            maxLength={200}
          />
          <div className="validationInfo">
            <span className="infoSpan">max 200 tecken</span>
          </div>
        </section>
      );
    }
    if (field.fieldType === "select") {
      const data = field.eng ? field.eng : [];
      return (
        <section className="allDiv" key={field.name}>
          {" "}
          <label htmlFor={field.name} key={field.name}>
            <p className="labelP">{field.title}</p>{" "}
            {field.required && <span className="required">*</span>}
          </label>{" "}
          <select
            name={field.name}
            id={field.name}
            onChange={props.handleInputChange}
            defaultValue={
              props.values[field.name] ? props.values[field.name] : ""
            }
            required={field.required}
          >
            <option value="" disabled>
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

  const history = useHistory();

  const goBackFunc = () => {
    history.goBack();
  };

  return (
    <FormContainerDiv>
      <form onSubmit={props.handleSubmit}>
        {fields}
        <Button
          type="submit"
          style={{
            width: "350px",
            height: "56px",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Färdig!
        </Button>
        <Button
          type="button"
          onClick={() => goBackFunc()}
          transparent
          style={{
            fontSize: "16px",
            color: "#A3A3A3",
            border: "none",
            fontWeight: "bold",
          }}
        >
          Avbryt
        </Button>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={6000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </FormContainerDiv>
  );
}
