import React, { FC, useEffect, useState } from "react";
import Form from "./Form";
import useForm from "../hooks/useForm";
import { createAdvert, updateAdvert } from "../graphql/mutations";
import { fieldsEditForm as fields } from "../utils/formUtils";
import { API, graphqlOperation } from "aws-amplify";
import Loader from "react-loader-spinner";
import styled from "styled-components";

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
    height?: number;
    width?: number;
    length?: number;
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
    phoneNumber?: number;
    climateImpact: number;
    version: number;
    revisions: number;
  };
  setRegive: React.Dispatch<React.SetStateAction<boolean>>;
  closeEditformAndFetchItem: () => void;
  image: string
}

const RegiveForm: FC<Props> = ({
  setRegive,
  item,
  closeEditformAndFetchItem,
  image
}: Props) => {
  const {
    values,
    handleInputChange,
    handleSubmit,
    handleCheckboxChange,
    redirect,
    result,
    file,
    fileUploading
    
  } = useForm(
    {
      id: item.id,
      title: item.title,
      status: "available",
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

  const [imageURL, setImageURL] =  useState(image)
  useEffect(() => {	
    if(file) {	
      setImageURL(URL.createObjectURL(file))	
      console.log(imageURL)
    }	
  }, [file])

    console.log(image)
  if (redirect && !fileUploading) {
    closeEditformAndFetchItem();
  }
  return (
    <>
      {!redirect && <button type="button" onClick={() => setRegive(false)}>
        X
      </button>}
      {!redirect && <ItemImg src={image} />}
      {!redirect && <Form
        values={values}
        fields={fields}
        mutation={updateAdvert}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        handleCheckboxChange={handleCheckboxChange}
      />}
      {redirect && <Loader type="ThreeDots" color="#9db0c6" height={200} width={200} />}
    </>
  );
};

export default RegiveForm;
