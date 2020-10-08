import React from 'react'
import useForm from '../hooks/useForm'

export default function AdvertForm() {

  const {
    values,
    handleInputChange,
    handleTextAreaChange,
    handleSubmit
  } = useForm({
    
      title: '',
      description: ''
    
  });

  return (
    <div>
      <form onSubmit={handleSubmit}> 
        <input type="text" value={values.title} onChange={handleInputChange}></input>
        <textarea value={values.description} onChange={handleTextAreaChange}></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
