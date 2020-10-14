import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import AdvertForm from "../components/Form";
import { createAdvertisement } from "../graphql/mutations";

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

const AddItem: FC = () => {
  const history = useHistory();

  return (
    <main>
      <h1>Add Item</h1>
      <AdvertForm
        initialValues={{ title: "Title", description: "", width: 0 }}
        fields={fields}
        mutation={createAdvertisement}
      />
      <div>
        <button type="button" onClick={() => history.goBack()}>
          Go back
        </button>
      </div>
    </main>
  );
};

export default AddItem;
