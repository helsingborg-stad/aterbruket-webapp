/* eslint-disable react/button-has-type */
import React, { FC, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import Form from "../components/Form";
import useForm from "../hooks/useForm";
import { createAdvertisement } from "../graphql/mutations";
import OpenCamera from "../components/OpenCamera";

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
  {
    name: "location",
    dataType: "text",
    fieldType: "input",
    disabled: false,
  },
];

type Props = {
  alreadyAQRCode: boolean;
};

const AddItem: FC<Props> = ({ alreadyAQRCode }: Props) => {
  const [qrCamera, setQrCamera] = useState({ delay: 500, result: "" });
  const history = useHistory();
  const { values, handleInputChange, handleSubmit, redirect } = useForm(
    { title: "", description: "", length: 1, location: "" },
    createAdvertisement
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
          mutation={createAdvertisement}
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
