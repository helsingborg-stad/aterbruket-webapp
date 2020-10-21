import { API, graphqlOperation } from "aws-amplify";
import React, { useState } from "react";

const useForm = (initialValues: any, mutation: string) => {
  const [values, setValues] = useState(initialValues);
  const [redirect, setRedirect] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<any>) => {
    const { target } = event;
    const { name, value } = target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValues(initialValues);

    const result: any = await API.graphql(
      graphqlOperation(mutation, { input: values })
    );

    if (result.data) {
      setRedirect(result.data.createAdvertisement.id);
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
