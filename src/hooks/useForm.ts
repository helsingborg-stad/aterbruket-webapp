import { API, graphqlOperation } from "aws-amplify";
import React, { useState, useEffect, useRef } from "react";
import { createAdvertisement } from "../graphql/mutations";

const useForm = (
        initialValues: {title: string, description: string}
    ) => {
	const [values, setValues] = useState(initialValues || {});
	
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { target } = event;
		const { value } = target;
		event.persist();
		setValues({ ...values, title: value });
	};

	const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { target } = event;
		const { value } = target;
		event.persist();
		setValues({ ...values, description: value });
		console.log(values.description)
	};

	const handleSubmit = async (event: any) => {
		event.preventDefault()
		await API.graphql(graphqlOperation(createAdvertisement, {input: values}))
	}

	  return {
		  values,
		  handleInputChange,
		  handleTextAreaChange,
		  handleSubmit
	  }
	  

}

export default useForm;