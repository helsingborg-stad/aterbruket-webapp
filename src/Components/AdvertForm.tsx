import React from 'react'
import useForm from '../hooks/useForm'

export default function AdvertForm() {

  const {
    values,
    handleChange,
  } = useForm({
    
      title: '',
      description: ''
    
  });

  return (
    <div>
      <form>
        <input type="text" value={values.title} onChange={handleChange}></input>
      </form>
    </div>
  )
}
