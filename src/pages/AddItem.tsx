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
  },
  {
    name: "width",
    dataType: "number",
    fieldType: "input",
  },
  {
    name: "description",
    fieldType: "textarea",
  },
];

type Props = {
  alreadyAQRCode: boolean;
};

const AddItem: FC<Props> = ({ alreadyAQRCode }: Props) => {
  const [qrCamera, setQrCamera] = useState({ delay: 500, result: "No result" });
  const history = useHistory();
  const { values, handleInputChange, handleSubmit, redirect } = useForm(
    { title: "", description: "", length: 0 },
    createAdvertisement
  );
  if (redirect) {
    return <Redirect to={`/item/${redirect}`} />;
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
        <button type="button" onClick={() => history.goBack()}>
          Go back
        </button>
      </div>
    </main>
  );
};

export default AddItem;
