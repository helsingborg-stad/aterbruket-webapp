import { API, graphqlOperation } from "aws-amplify";
import React, { useState, useEffect, useRef } from "react";
import { createAdvertisement } from "../graphql/mutations";

const useForm = (initialValues: {
  title: string;
  description: string;
  length: number;
  width: number;
  height: number;
}) => {
  const [values, setValues] = useState(initialValues || {});

  const handleInputChange = (event: React.ChangeEvent<any>) => {
    const { target } = event;
    const { name, value } = target;

    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValues(initialValues);

    await API.graphql(graphqlOperation(createAdvertisement, { input: values }));
  };

  return {
    values,
    handleInputChange,
    handleSubmit,
  };
};

export default useForm;
