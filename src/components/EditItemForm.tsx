/* eslint-disable no-console */
import React, { FC } from "react";
import Form from "./Form";
import useForm from "../hooks/useForm";
import { updateAdvertisement } from "../graphql/mutations";

const fields = [
  {
    name: "title",
    dataType: "text",
    fieldType: "input",
    disabled: false,
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
    id: number;
    title: string;
    description: string;
    length?: number;
  };
  editItem: boolean;
  setEditItem: React.Dispatch<React.SetStateAction<boolean>>;
  closeEditformAndFetchItem: () => void;
}

const EditItemForm: FC<Props> = ({
  setEditItem,
  editItem,
  item,
  closeEditformAndFetchItem,
}: Props) => {
  const { values, handleInputChange, handleSubmit, redirect } = useForm(
    {
      title: item.title,
      description: item.description,
      length: item.length,
      id: item.id,
    },
    updateAdvertisement
  );

  if (redirect) {
    closeEditformAndFetchItem();
  }
  return (
    <>
      <button type="button" onClick={() => setEditItem(false)}>
        X
      </button>
      <Form
        values={values}
        fields={fields}
        mutation={updateAdvertisement}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default EditItemForm;
