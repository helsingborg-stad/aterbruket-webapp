/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Redirect } from "react-router-dom";
import useForm from "../hooks/useForm";
import { IFields } from "../interfaces/IForm";

export default function Form(props: {
  initialValues: any;
  fields: IFields[];
  mutation: string;
}) {
  const { values, handleInputChange, handleSubmit, redirect } = useForm(
    props.initialValues,
    props.mutation
  );

  const fields = props.fields.map((field, index) => {
    if (field.fieldType === "input") {
      return (
        <input
          key={index}
          type={field.dataType}
          name={field.name}
          onChange={handleInputChange}
          value={values[field.name]}
          placeholder={field.name}
        />
      );
    }
    if (field.fieldType === "textarea") {
      return (
        <textarea
          key={index}
          name={field.name}
          onChange={handleInputChange}
          value={values[field.name]}
          placeholder={field.name}
        />
      );
    }
  });

  if (redirect) {
    return <Redirect to={`/item/${redirect}`} />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {fields}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
