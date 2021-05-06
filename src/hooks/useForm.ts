/* eslint-disable no-console */
import { API, graphqlOperation, Storage } from "aws-amplify";
import React, { useState } from "react";
import emailjs from "emailjs-com";
import { v4 as uuidv4 } from "uuid";
import HandleClimatImpact from "./HandleClimatImpact";
import { createAdvert } from "../graphql/mutations";
import imageCompression from "browser-image-compression";

const recreateInitial = async (mutation: any, values: any) => {
  delete values.createdAt;
  delete values.updatedAt;
  values.version = values.revisions + 1;
  values.status = "pickedUp";
  values.revisions -= 1;

  await API.graphql(graphqlOperation(mutation, { input: values }));
};

const useForm = (initialValues: any, mutation: string) => {
  const [values, setValues] = useState(initialValues);
  const [redirect, setRedirect] = useState(false);
  const [result, setResult] = useState({}) as any;
  const [file, setFile] = useState(false) as any;
  const [fileUploading, setFileUploading] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<any>, parent: any) => {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;

    setValues({
      ...values,
      [parent]: { ...values[parent], [target.name]: value },
    });
  };

  const upload = (file: any) => {
    file.uuid = uuidv4();
    Storage.put(file.uuid, file)
      .then((result: any) => {
        setFileUploading(false);
        return { src: result.key, alt: file.name };
      })
      .catch((err) => {
        return err;
      });
  };

  function handleImageUpload(imageFile: any) {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1500,
      useWebWorker: true,
    };
    imageCompression(imageFile, options)
      .then((compressedFile) => {
        setFile(compressedFile);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  const handleInputChange = async (event: React.ChangeEvent<any>) => {
    const { target } = event;
    const { name, value } = target;
    if (target.files) {
      handleImageUpload(target.files[0]);
      setFileUploading(true);
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
      // handleImageUpload(file);
      values.images = { src: file.uuid, alt: file.name };
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
      return setRedirect(true);
    }

    setResult(result.data.createAdvert);

    if (result.data && !values.id) {
      return setRedirect(result.data.createAdvert.id);
    }
  };

  /*  const sendEmail = (data: any) => {
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
        "template_slykgia",
        templateParams,
        "user_nGtt95bDVTNyRyXq3porD"
      )
      .then(
        function (response) {
          console.log("SUCCESS sending email!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED sending email", error);
        }
      );
  }; */

  return {
    values,
    redirect,
    handleInputChange,
    handleSubmit,
    handleCheckboxChange,
    result,
    file,
    fileUploading,
  };
};

export default useForm;
