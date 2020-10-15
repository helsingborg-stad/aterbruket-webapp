import { API, graphqlOperation } from "aws-amplify";
import React, { useState, useEffect, useRef } from "react";

const useForm = (initialValues: any, mutation: string) => {
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (event: React.ChangeEvent<any>) => {
    const { target } = event;
    const { name, value } = target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValues(initialValues);

    const result = await API.graphql(graphqlOperation(mutation, { input: values }));
    console.log(result.data?.createAdvertisement.id);
  };

  return {
    values,
    handleInputChange,
    handleSubmit,
  };
};

export default useForm;
