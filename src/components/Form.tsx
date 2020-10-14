/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/destructuring-assignment */
import QRCode from "qrcode.react";
import React from "react";
import useForm from "../hooks/useForm";
import { IFields } from "../interfaces/IForm";

export default function AdvertForm(props: {
  initialValues: any;
  fields: IFields[];
  mutation: string;
}) {
  const { values, handleInputChange, handleSubmit } = useForm(
    props.initialValues,
    props.mutation
  );

  const fields = props.fields.map((field, index) => {
    if (field.fieldType === "input") {
      return (
        <div>
          <input
            key={index}
            type={field.dataType}
            name={field.name}
            onChange={handleInputChange}
            value={values[field.name]}
          />
        </div>
      );
    }
    if (field.fieldType === "textarea") {
      return (
        <textarea
          key={index}
          name={field.name}
          onChange={handleInputChange}
          value={values[field.name]}
        />
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
