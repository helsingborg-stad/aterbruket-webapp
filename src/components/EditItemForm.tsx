/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
import React, { FC } from "react";
import Form from "./Form";
import useForm from "../hooks/useForm";
import { updateAdvertisement } from "../graphql/mutations";
import { fieldsEditForm as fields } from "../util/utils";

interface Props {
  item: {
    id: number;
    title: string;
    category?: string;
    quantity?: number;
    height?: number;
    width?: number;
    length?: number;
    color?: string;
    material?: string;
    condition?: string;
    areaOfUse?: string;
    description?: string;
    department?: string;
    location?: string;
    instructions?: string;
    contactPerson?: string;
    email?: string;
    phoneNumber?: number;
  };
  setEditItem: React.Dispatch<React.SetStateAction<boolean>>;
  closeEditformAndFetchItem: () => void;
}

const EditItemForm: FC<Props> = ({
  setEditItem,
  item,
  closeEditformAndFetchItem,
}: Props) => {
  const { values, handleInputChange, handleSubmit, redirect } = useForm(
    {
      id: item.id,
      title: item.title,
      category: item.category,
      quantity: item.quantity,
      height: item.height,
      width: item.width,
      length: item.length,
      color: item.color,
      material: item.material,
      condition: item.condition,
      areaOfUse: item.areaOfUse,
      description: item.description,
      department: item.department,
      location: item.location,
      instructions: item.instructions,
      contactPerson: item.contactPerson,
      email: item.email,
      phoneNumber: item.phoneNumber,
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
