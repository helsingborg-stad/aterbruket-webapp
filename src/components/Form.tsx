/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
// import useForm from "../hooks/useForm";
import { IFields } from "../interfaces/IForm";

export default function Form(props: {
  values: any;
  fields: IFields[];
  mutation: string;
  handleInputChange: (event: React.ChangeEvent<any>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}) {
  const fields = props.fields.map((field, index) => {
    if (field.fieldType === "input" || field.fieldType === "checkbox") {
      return (
        <input
          key={index}
          type={field.dataType}
          name={field.name}
          onChange={props.handleInputChange}
          value={props.values[field.name]}
          placeholder={field.name}
          disabled={field.disabled}
        />
      );
    }
    if (field.fieldType === "textarea") {
      return (
        <textarea
          key={index}
          name={field.name}
          onChange={props.handleInputChange}
          value={props.values[field.name]}
          placeholder={field.name}
        />
      );
    }
  });

  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        {fields}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
