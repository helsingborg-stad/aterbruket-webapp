import { API, graphqlOperation } from "aws-amplify";
import React, { useState, useEffect, useRef } from "react";

const useForm = (initialValues: any, mutation: string) => {
  const [values, setValues] = useState(initialValues);
  const [redirect, setRedirect] = useState(false);

  // initalValue -> {title: "", description: "", length: 0}
  // value -> title: "", description: "", length: 0}
  console.log("**** initialValues ", initialValues);
  console.log("Values is -> ", values);

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
