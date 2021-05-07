/* eslint-disable consistent-return */
/* eslint-disable no-console */
import { API, graphqlOperation, Storage } from "aws-amplify";
import React, { useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";
import HandleClimatImpact from "./HandleClimatImpact";
import { createAdvert } from "../graphql/mutations";

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

  const upload = async (fileObject: any) => {
    const uuid = uuidv4();
    return Storage.put(uuid, file)
      .then((putResult: any) => {
        return { src: putResult.key, alt: fileObject.name };
      })
      .catch((err) => {
        console.error("Image upload error: ", err);
        return err;
      });
  };

  function handleImageUpload(imageFile: any) {
    const options = {
      maxSizeMB: 0.8,
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
      return;
    }
    setValues({
      ...values,
      [name]: value.trimStart(),
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFileUploading(true);

    let uploadedFile;
    if (file) {
      try {
        uploadedFile = await upload(file);
      } catch (error) {
        console.error(error);
        setFileUploading(false);
        toast("Ett fel inträffade när bilden laddades upp, försök igen!");
        return;
      }
    }

    const lca = await HandleClimatImpact(values);

    let mutationResult: any;
    try {
      mutationResult = await API.graphql(
        graphqlOperation(mutation, {
          input: {
            ...values,
            images: uploadedFile,
            climateImpact: lca,
          },
        })
      );
    } catch (error) {
      console.error(error);
      setFileUploading(false);
      toast("Ett okänt fel inträffade 😵 Försök igen!");
      return;
    }

    setValues(initialValues);

    if (mutationResult.data && values.id) {
      recreateInitial(createAdvert, initialValues);
      setFileUploading(false);
      return setRedirect(true);
    }

    setResult(mutationResult.data.createAdvert);

    if (mutationResult.data && !values.id) {
      setFileUploading(false);
      return setRedirect(mutationResult.data.createAdvert.id);
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
