/* eslint-disable no-console */
import { API, graphqlOperation, Storage } from "aws-amplify";
import React, { useState } from "react";
import emailjs from "emailjs-com";
import { v4 as uuidv4 } from "uuid";
import HandleClimatImpact from "./HandleClimatImpact";
import { createAdvert } from "../graphql/mutations";

const recreateInitial = async (mutation: any, values: any) => {
  delete values.createdAt;
  delete values.updatedAt;
  values.version = values.revisions + 1;

  await API.graphql(graphqlOperation(mutation, { input: values }));
};

function upload(file: any) {
  Storage.put(file.uuid, file, {
    progressCallback(progress: any) {
      console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
    },
  })
    .then((result: any) => {
      return { src: result.key, alt: file.name };
    })
    .catch((err) => {
      return err;
    });
}

const useForm = (initialValues: any, mutation: string) => {
  const [values, setValues] = useState(initialValues);
  const [redirect, setRedirect] = useState(false);
  const [result, setResult] = useState({}) as any;
  const [file, setFile] = useState(false) as any;

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
    let { name, value } = target;
    if (target.files) {
      console.log("target.files", target.files);
      target.files[0].uuid = uuidv4();
      setFile(target.files[0]);
      console.log("target.files[0]", target.files[0]);

      return;
    }
    setValues({
      ...values,
      [name]: value.trimStart(),
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (file) {
      upload(file);
      values.images = { src: file.uuid, alt: file.name };
      console.log("values.images", values.images);
    }

    event.preventDefault();
    const lca = await HandleClimatImpact(values);
    const result: any = await API.graphql(
      graphqlOperation(mutation, {
        input: { ...values, climateImpact: lca },
      })
    );
    setValues(initialValues);

    if (result.data && values.id) {
      recreateInitial(createAdvert, initialValues);
      console.log("db UPDATE ", result.data.updateAdvert);
      return setRedirect(true);
    }

    setResult(result.data.createAdvert);

    if (result.data && !values.id) {
      console.log("db CREATE ", result.data.createAdvert);
      sendEmail(result.data.createAdvert);
      return setRedirect(result.data.createAdvert.id);
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
          //console.log("SUCCESS sending email!", response.status, response.text);
        },
        function (error) {
          //console.log("FAILED sending email", error);
        }
      );
  };

  return {
    values,
    redirect,
    handleInputChange,
    handleSubmit,
    handleCheckboxChange,
    result,
  };
};

export default useForm;
