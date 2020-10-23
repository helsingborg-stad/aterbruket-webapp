/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React, { FC } from "react";
import Form from "./Form";
import useForm from "../hooks/useForm";
import { createAdvertisement } from "../graphql/mutations";

const fields = [
  {
    name: "title",
    dataType: "text",
    fieldType: "input",
    disabled: true,
  },
  {
    name: "length",
    dataType: "number",
    fieldType: "input",
    disabled: false,
  },
  {
    name: "description",
    fieldType: "textarea",
    disabled: false,
  },
];

interface Props {
  item: {
    title: string;
    description: string;
    length?: number;
  };
  setEditItem: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditItemForm: FC<Props> = ({ setEditItem, item }) => {
  const { values, handleInputChange, handleSubmit } = useForm(
    { title: item.title, description: item.description, length: item.length },
    createAdvertisement
  );
  return (
    <>
      <button onClick={() => setEditItem(false)}>X</button>
      <Form
        values={values}
        fields={fields}
        mutation={createAdvertisement}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default EditItemForm;
