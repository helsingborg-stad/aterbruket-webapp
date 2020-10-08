import React, { useState, useEffect, useRef } from "react";

const useForm = (
        initialValues: {title: string, description: string}
    ) => {
	const [values, setValues] = useState(initialValues || {});
	
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { target } = event;
		const { title, value } = target;
		event.persist();
		setValues({ ...values, title: value });
	  };

	  return {
		  values,
		  handleChange
	  }
	  

}

export default useForm;