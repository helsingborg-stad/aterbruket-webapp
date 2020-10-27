/* eslint-disable no-console */
import { API, graphqlOperation } from "aws-amplify";
import React, { useState } from "react";

const useForm = (initialValues: any, mutation: string) => {
  const [values, setValues] = useState(initialValues);
  const [redirect, setRedirect] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<any>) => {
    const { target } = event;
    const { name, value } = target;
    setValues({ ...values, [name]: value, status: "available" }); // status will be set to a default-value in the graphql schema later. But for now, let this be.
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValues(initialValues);
    const result: any = await API.graphql(
      graphqlOperation(mutation, { input: values })
    );

    if (result.data && values.id) {
      console.log("db UPDATE ", result.data.updateAdvertisement);
      return setRedirect(true);
    }

    if (result.data && !values.id) {
      console.log("db CREATE ", result.data.createAdvertisement);
      return setRedirect(result.data.createAdvertisement.id);
    }
  };

  return {
    values,
    redirect,
    handleInputChange,
    handleSubmit,
  };
};

export default useForm;
