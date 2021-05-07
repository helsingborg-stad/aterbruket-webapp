import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import Form from "./Form";
import useForm from "../hooks/useForm";
import { updateAdvert } from "../graphql/mutations";
import { fieldsEditForm as fields } from "../utils/formUtils";

const ItemImg = styled.img`
  width: 300px;
  height: 300px;
  margin: 0;
`;

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
    images: [{ url: string }];
    purchasePrice: number;
  };
  setEditItem: React.Dispatch<React.SetStateAction<boolean>>;
  closeEditformAndFetchItem: () => void;
  image: string;
}

const EditItemForm: FC<Props> = ({
  setEditItem,
  item,
  closeEditformAndFetchItem,
  image,
}: Props) => {
  const {
    values,
    handleInputChange,
    handleSubmit,
    handleCheckboxChange,
    redirect,
    result,
    file,
    fileUploading,
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
      purchasePrice: item.purchasePrice,
    },
    updateAdvert
  );

  const [imageURL, setImageURL] = useState(image);

  useEffect(() => {
    if (file) {
      setImageURL(URL.createObjectURL(file));
    }
  }, [file]);

  if (redirect && !fileUploading) {
    closeEditformAndFetchItem();
  }
  return (
    <>
      {fileUploading && (
        <Loader type="ThreeDots" color="#9db0c6" height={200} width={200} />
      )}

      {!fileUploading && (
        <>
          <button type="button" onClick={() => setEditItem(false)}>
            X
          </button>
          {/* <ItemImg src={imageURL} /> */}
          <Form
            values={values}
            fields={fields}
            mutation={updateAdvert}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleCheckboxChange={handleCheckboxChange}
          />
        </>
      )}
    </>
  );
};

export default EditItemForm;
