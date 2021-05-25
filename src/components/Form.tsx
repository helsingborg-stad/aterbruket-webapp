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
    background-color: ${(props) => props.theme.colors.white};
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
      color: ${(props) => props.theme.colors.darkest};
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
    background-color: ${(props) => props.theme.colors.lightGray};
    border-radius: 4.5px;
    height: 56px;
    align-items: center;

    .labelP {
      color: ${(props) => props.theme.colors.darker};
      text-transform: none;
    }
  }
  .areaOfUseDiv {
    flex-direction: column;
    align-items: flex-start;
    height: 116px;

    div {
      display: flex;
      flex-direction: row-reverse;
      justify-content: flex-end;
      //margin: 8px 0 8px 0;
      padding: 0 0 0 12px;

      .labelP {
        margin: 0 0 0 4px;
      }
    }
  }

  .allDiv {
    display: flex;
    //align-items: center;
    justify-content: space-around;
    flex-direction: column;

    h4 {
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 112%;
      color: ${(props) => props.theme.colors.darkest};
    }

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
        color: #a3a3a3;
      }
    }
    textarea {
      padding: 16px 0 0 24px;
      height: 192px;
      ::placeholder {
        font-family: "Roboto";
        color: #a3a3a3;
      }
    }
    select:invalid {
      font-style: italic;
      color: #a3a3a3;
    }
  }
  .dimensionsDiv {
    position: relative;
    height: 56px;
    margin: 12px 0 0 0;
    input {
      text-align: right;
      padding: 0 10px 0 24px;
    }
    h4 {
      color: ${(props) => props.theme.colors.primary};
      position: absolute;
      margin: 0;
      top: -17px;
      font-style: normal;
      font-weight: 900;
      font-size: 14px;
      line-height: 150%;
      text-transform: uppercase;
    }

    .labelP {
      position: absolute;
      top: 50%;
      left: 40px;
      transform: translate(0, -50%);
      font-style: normal;
      font-weight: bold;
      text-transform: none;

      color: ${(props) => props.theme.colors.darkest};
    }
  }

  input[type="file"] {
    white-space: break-spaces;
    padding: 0;
    background: transparent;
    height: 80px;

    ::-webkit-file-upload-button {
      background: ${(props) => props.theme.colors.lightGray};
      color: black;
      width: 100%;
      height: 56px;
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
        <section
          className={
            dimensions.includes(field.name) ? "allDiv dimensionsDiv" : "allDiv"
          }
          style={{ marginTop: field.title === "Höjd" ? "24px" : "12px" }}
          key={field.name}
        >
          {field.title === "Färg" && <h4>Beskriv prylen</h4>}
          {field.title === "Förvaltning" && <h4>Var finns prylen?</h4>}
          {field.title === "Kontaktperson" && <h4>Kontakt</h4>}
          {field.title === "Höjd" && <h4>Mått</h4>}

          <label htmlFor={field.name}>
            <p className="labelP">{field.title}</p>
            {field.required && <span className="required">*</span>}
          </label>
          <input {...attributes} />

          {field.name === "title" && (
            <div className="validationInfo">
              <span className="infoSpan">max 20 tecken</span>
            </div>
          )}

          {field.name === "purchasePrice" && (
            <div className="validationInfo">
              <span className="infoSpan">
                Vet du inte exakt vad den köptes in för? <br />
                Ange då en uppskattning av priset.
              </span>{" "}
            </div>
          )}
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

          <div
            className={
              field.title === "Användningsområde"
                ? "checkboxDiv areaOfUseDiv"
                : "checkboxDiv"
            }
          >
            {checkboxInput}
          </div>
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
