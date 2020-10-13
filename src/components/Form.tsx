import React from "react";
import useForm from "../hooks/useForm";
import { IFields } from '../interfaces/IForm'

export default function AdvertForm(props: { fields: IFields[], mutation: string }) {
  const { values, handleInputChange, handleSubmit } = useForm({}, props.mutation);

  const fields = props.fields.map((field) => {
    if (field.fieldType === "input") {
      return (
        <input
          type={field.dataType}
          name={field.name}
          onChange={handleInputChange}
          value={values[field.name]}
        ></input>
      );
    } else if (field.fieldType === "textarea") {
      return (
        <textarea
          name={field.name}
          onChange={handleInputChange}
          value={values[field.name]}
        ></textarea>
      );
    }
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {fields}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}