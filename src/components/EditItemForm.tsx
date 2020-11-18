import React, { FC } from "react";
import Form from "./Form";
import useForm from "../hooks/useForm";
import { createAdvert, updateAdvert } from "../graphql/mutations";
import { fieldsEditForm as fields } from "../utils/formUtils";
import { API, graphqlOperation } from "aws-amplify";

interface IareaOfUse {
  indoors: boolean;
  outside: boolean;
}

interface Imaterial {
  metal: boolean;
  plastic: boolean;
  other: boolean;
  wood: boolean;
}

interface Props {
  item: {
    id: number;
    title: string;
    status: string;
    category?: string;
    quantity?: number;
    height?: string;
    width?: string;
    length?: string;
    color?: string;
    material?: Imaterial | any;
    condition?: string;
    areaOfUse?: IareaOfUse | any;
    description?: string;
    department?: string;
    location?: string;
    instructions?: string;
    contactPerson?: string;
    email?: string;
    phoneNumber?: string;
    climateImpact: number;
    version: number;
    revisions: number;
  };
  setEditItem: React.Dispatch<React.SetStateAction<boolean>>;
  closeEditformAndFetchItem: () => void;
}

const EditItemForm: FC<Props> = ({
  setEditItem,
  item,
  closeEditformAndFetchItem,
}: Props) => {
  const {
    values,
    handleInputChange,
    handleSubmit,
    handleCheckboxChange,
    redirect,
  } = useForm(
    {
      id: item.id,
      title: item.title,
      status: item.status,
      category: item.category,
      quantity: item.quantity,
      height: item.height,
      width: item.width,
      length: item.length,
      color: item.color,
      material: {
        metal: item.material[0].metal,
        plastic: item.material[0].plastic,
        other: item.material[0].other,
        wood: item.material[0].wood,
      },
      condition: item.condition,
      areaOfUse: {
        indoors: item.areaOfUse[0].indoors,
        outside: item.areaOfUse[0].outside,
      },
      description: item.description,
      department: item.department,
      location: item.location,
      instructions: item.instructions,
      contactPerson: item.contactPerson,
      email: item.email,
      phoneNumber: item.phoneNumber,
      climateImpact: item.climateImpact,
      version: 0,
      revisions: item.revisions + 1,
    },
    updateAdvert
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
        mutation={updateAdvert}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        handleCheckboxChange={handleCheckboxChange}
      />
    </>
  );
};

export default EditItemForm;
