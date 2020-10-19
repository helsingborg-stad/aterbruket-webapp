import React, { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "../components/Form";
import { createAdvertisement } from "../graphql/mutations";
import OpenCamera from "../components/OpenCamera";

const fields = [
  {
    name: "title",
    dataType: "text",
    fieldType: "input"
  },
  {
    name: "width",
    dataType: "number",
    fieldType: "input"
  },
  {
    name: "description",
    fieldType: "textarea"
  }
];

type Props = {
  alreadyAQRCode: boolean;
};

const AddItem: FC<Props> = ({ alreadyAQRCode }: Props) => {
  const [qrCamera, setQrCamera] = useState({ delay: 500, result: "No result" });
  const history = useHistory();

  return (
    <main>
      {!alreadyAQRCode ? (
        <Form
          initialValues={{ title: "", description: "", width: null }}
          fields={fields}
          mutation={createAdvertisement}
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
