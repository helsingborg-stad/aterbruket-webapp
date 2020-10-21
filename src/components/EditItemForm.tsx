import React, { FC } from "react";
import Form from "../components/Form";
import useForm from "../hooks/useForm";
import { createAdvertisement } from "../graphql/mutations";

const fields = [
  {
    name: "title",
    dataType: "text",
    fieldType: "input"
  },
  {
    name: "length",
    dataType: "number",
    fieldType: "input"
  },
  {
    name: "description",
    fieldType: "textarea"
  }
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
  console.log(item.title);
  console.log(values);
  return (
    <React.Fragment>
      <button onClick={() => setEditItem(false)}>X</button>
      <Form
        values={values}
        fields={fields}
        mutation={createAdvertisement}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </React.Fragment>
  );
};

export default EditItemForm;
