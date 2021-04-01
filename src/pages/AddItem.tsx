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
import Loader from "react-loader-spinner";

const ItemImg = styled.img`
  width: 200px;
  height: 200px;
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
    fileUploading,
  } = useForm(
    {
      title: "Bord",
      status: "available",
      category: "other",
      quantity: 1,
      height: "15",
      width: "15",
      length: "15",
      color: "15",
      condition: "good",
      areaOfUse: { indoors: false, outside: true },
      material: {
        metal: true,
        plastic: false,
        other: false,
        wood: false,
      },
      description: "hjdsfhjdskf",
      department: user.attributes["custom:department"]
        ? user.attributes["custom:department"]
        : "HBG Works",
      location: "Helsingborg",
      instructions: "hhehehe",
      contactPerson: user.attributes.name ? user.attributes.name : "Johanna",
      email: user.attributes.email ? user.attributes.email : "nilsson@test.com",
      phoneNumber: "0700000000",
      giver: user.attributes.sub,
      climateImpact: 0,
      version: 0,
      revisions: 0,
    },
    createAdvert
  );

  const [imageURL, setImageURL] = useState("");

  useEffect(() => {}, [fileUploading]);

  useEffect(() => {
    if (file) {
      setImageURL(URL.createObjectURL(file));
    }
  }, [file]);

  if (redirect && !fileUploading) {
    return <Redirect to={`/item/${redirect}`} />;
  }
  if (qrCamera.result.length > 2) {
    return <Redirect to={`/item/${qrCamera.result}`} />;
  }
  return (
    <main>
      {!redirect && file && <ItemImg src={imageURL} />}
      {!redirect && !alreadyAQRCode ? (
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

      {fileUploading && redirect && (
        <Loader type="ThreeDots" color="#9db0c6" height={200} width={200} />
      )}
    </main>
  );
};

export default AddItem;
