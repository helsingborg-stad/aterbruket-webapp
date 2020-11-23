/* eslint-disable no-console */
import React, { FC, useContext, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import Form from "../components/Form";
import useForm from "../hooks/useForm";
import { createAdvert } from "../graphql/mutations";
import OpenCamera from "../components/OpenCamera";
import { fieldsForm as fields } from "../utils/formUtils";
import { UserContext } from "../contexts/UserContext";
import styled from "styled-components";

const ItemImg = styled.img`
  width: 300px;
  height: 300px;
  margin: 0;
`;

interface IQrCamera {
  delay: number;
  result: string;
}

interface Props {
  alreadyAQRCode: boolean;
  qrCamera: IQrCamera;
  setQrCamera: React.Dispatch<
    React.SetStateAction<{
      delay: number;
      result: string;
    }>
  >;
}

const AddItem: FC<Props> = ({
  alreadyAQRCode,
  qrCamera,
  setQrCamera,
}: Props) => {
  const history = useHistory();
  const user: any = useContext(UserContext);
  const {
    values,
    handleInputChange,
    handleSubmit,
    handleCheckboxChange,
    redirect,
    result,
    file,
  } = useForm(
    {
      title: "",
      status: "available",
      category: "",
      quantity: 1,
      height: "",
      width: "",
      length: "",
      color: "",
      condition: "",
      areaOfUse: { indoors: false, outside: false },
      material: {
        metal: false,
        plastic: false,
        other: false,
        wood: false,
      },
      description: "",
      department: user["custom:department"] ? user["custom:department"] : "",
      location: "",
      instructions: "",
      contactPerson: user.attributes.name ? user.attributes.name : "",
      email: user.attributes.email ? user.attributes.email : "",
      phoneNumber: "",
      giver: user.attributes.sub,
      climateImpact: 0,
      version: 0,
      revisions: 0,
    },
    createAdvert
  );

  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    if (file) {
      setImageURL(URL.createObjectURL(file));
    }
  }, [file]);

  if (redirect) {
    return <Redirect to={`/item/${redirect}`} />;
  }
  if (qrCamera.result.length > 2) {
    return <Redirect to={`/item/${qrCamera.result}`} />;
  }
  return (
    <main>
      {file && <ItemImg src={imageURL} />}
      {!alreadyAQRCode ? (
        <Form
          values={values}
          fields={fields}
          mutation={createAdvert}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          handleCheckboxChange={handleCheckboxChange}
        />
      ) : (
        <OpenCamera qrCamera={qrCamera} setQrCamera={setQrCamera} />
      )}
    </main>
  );
};

export default AddItem;
