import React from "react";
import useForm from "../hooks/useForm";

export default function AdvertForm() {
  const { values, handleInputChange, handleSubmit } = useForm({
    title: "",
    description: "",
    height: 0,
    width: 0,
    length: 0,
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={values.title}
          onChange={handleInputChange}
        ></input>
        <input
          type="text"
          name="width"
          value={values.width}
          onChange={handleInputChange}
        ></input>
        <textarea
          value={values.description}
          onChange={handleInputChange}
          name="description"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
