/* eslint-disable no-console */
import React, { FC, useContext, useEffect, useState, Suspense } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import useForm from "../hooks/useForm";
import { createAdvert } from "../graphql/mutations";
import { fieldsForm as fields } from "../utils/formUtils";
import UserContext from "../contexts/UserContext";

const OpenCamera = React.lazy(() => import("../components/OpenCamera"));
const Form = React.lazy(() => import("../components/Form"));

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
  const { user } = useContext(UserContext);
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
      department: user.department ? user.department : "",
      location: user.address ? user.address : "",
      instructions: "",
      contactPerson: user.name ? user.name : "",
      email: user.email ? user.email : "",
      phoneNumber: "",
      giver: user.sub,
      climateImpact: 0,
      version: 0,
      revisions: 0,
      purchasePrice: "",
    },
    createAdvert
  );
  const [imageURL, setImageURL] = useState("");

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
      <Suspense fallback={<div>Loading...</div>}>
      {!fileUploading && file && <ItemImg src={imageURL} />}

      {!fileUploading && !alreadyAQRCode && (
        <Form
          values={values}
          fields={fields}
          mutation={createAdvert}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}

      {!fileUploading && alreadyAQRCode && (
        <OpenCamera qrCamera={qrCamera} setQrCamera={setQrCamera} />
      )}

      {fileUploading && (
        <Loader type="ThreeDots" color="#9db0c6" height={200} width={200} />
      )}
      </Suspense>
    </main>
  );
};

export default AddItem;
