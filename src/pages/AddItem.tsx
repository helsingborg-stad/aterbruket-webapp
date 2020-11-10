/* eslint-disable react/button-has-type */
import React, { FC, useContext, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import Form from "../components/Form";
import useForm from "../hooks/useForm";
import { createAdvert } from "../graphql/mutations";
import OpenCamera from "../components/OpenCamera";
import { fieldsForm as fields } from "../utils/formUtils";
import {UserContext} from "../contexts/UserContext";
import { API, graphqlOperation } from "aws-amplify";

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
  const user: any = useContext(UserContext)
  const { values, handleInputChange, handleSubmit, redirect, result } = useForm(
    {
      title: "",
      category: "",
      quantity: 0,
      height: 0,
      width: 0,
      length: 0,
      color: "",
      material: "",
      condition: "",
      areaOfUse: "",
      description: "",
      department: "",
      location: "",
      instructions: "",
      contactPerson: "",
      email: "",
      phoneNumber: 0,
      giver: user.attributes.sub,
      version: 0
    },
    createAdvert
  );

  if (redirect) {
    return <Redirect to={`/item/${redirect}`} />;
  }
  if (qrCamera.result.length > 2) {
    return <Redirect to={`/item/${qrCamera.result}`} />;
  }
  return (
    <main>
      {!alreadyAQRCode ? (
        <Form
          values={values}
          fields={fields}
          mutation={createAdvert}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      ) : (
        <OpenCamera qrCamera={qrCamera} setQrCamera={setQrCamera} />
      )}
      <div>
        <br />
        <button onClick={() => history.goBack()}>Go back</button>
      </div>
    </main>
  );
};

export default AddItem;
