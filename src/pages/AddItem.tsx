import React, { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import AdvertForm from "../components/Form";
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

const AddItem: FC<Props> = ({ alreadyAQRCode }) => {
  const [qrCamera, setQrCamera] = useState({ delay: 500, result: "No result" });
  const history = useHistory();

  return (
    <main>
      Add Item
      {!alreadyAQRCode ? (
        <AdvertForm
          initialValues={{ title: "Title", description: "", width: 0 }}
          fields={fields}
          mutation={createAdvertisement}
        />
      ) : (
        <OpenCamera qrCamera={qrCamera} setQrCamera={setQrCamera} />
      )}
      <div>
        <button type="button" onClick={() => history.goBack()}>
          Go back
        </button>
      </div>
    </main>
  );
};

export default AddItem;
