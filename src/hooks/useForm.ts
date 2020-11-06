/* eslint-disable no-console */
import { API, graphqlOperation } from "aws-amplify";
import React, { useState } from "react";
import emailjs from "emailjs-com";
import HandleClimatImpact from "./HandleClimatImpact";

const useForm = (initialValues: any, mutation: string) => {
  const [values, setValues] = useState(initialValues);
  const [redirect, setRedirect] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<any>, parent: any) => {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setValues({
      ...values,
      [parent]: { ...values[parent], [target.name]: value },
    });
  };

  const handleInputChange = async (event: React.ChangeEvent<any>) => {
    const { target } = event;
    const { name, value } = target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const lca = await HandleClimatImpact(values);

    const result: any = await API.graphql(
      graphqlOperation(mutation, {
        input: { ...values, climateImpact: lca, status: "available" }, // status will be set to a default-value in the graphql schema later. But for now, let this be.
      })
    );

    if (result.data && values.id) {
      console.log("db UPDATE ", result.data.updateAdvertisement);
      return setRedirect(true);
    }

    if (result.data && !values.id) {
      console.log("db CREATE ", result.data.createAdvertisement);
      sendEmail(result.data.createAdvertisement);
      return setRedirect(result.data.createAdvertisement.id);
    }
  };

  const sendEmail = (data: any) => {
    const templateParams = {
      id: data.id,
      contactPerson: data.contactPerson,
      department: data.department,
      location: data.location,
      phoneNumber: data.phoneNumber,
      email: data.email,
    };
    emailjs
      .send(
        "default_service",
        "template_x2baaln",
        templateParams,
        "user_fuL69kKfoqD8lVmx7NjdK"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  };

  return {
    values,
    redirect,
    handleInputChange,
    handleSubmit,
    handleCheckboxChange,
  };
};

export default useForm;

/*  const sendEmail = (event: React.ChangeEvent<any>) => {
    emailjs
      .sendForm(
        "default_service",
        "template_x2baaln",
        event.target,
        "user_fuL69kKfoqD8lVmx7NjdK"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }; */
