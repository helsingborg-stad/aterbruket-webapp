import { API, graphqlOperation } from "aws-amplify";
import React, { useState, useEffect, useRef } from "react";

const useForm = (initialValues: any, mutation: string) => {
  const [values, setValues] = useState(initialValues);
  console.log(values);

  const handleInputChange = (event: React.ChangeEvent<any>) => {
    const { target } = event;
    const { name, value } = target;
	setValues({ ...values, [name]: value });
	console.log(values);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValues(initialValues);

    await API.graphql(graphqlOperation(mutation, { input: values }));
  };

  return {
    values,
    handleInputChange,
    handleSubmit,
  };
};

export default useForm;
