import React from 'react'
import { useState } from 'react'

import styles from "./form.module.css";
import { postRequest } from '../../services/utils.tsx'

const sendRefresh = new Event('componentRefresh');

function Form({ inputs, method, target }) {
  const[formData, setFormData] = useState(() => {
    let initialData = new FormData();
    inputs.map((value, index) => {
      if (value.type === "text") {
        initialData.append(value.name, "")
      }
      if (value.type === "date") {
        initialData.append(value.name, new Date().toISOString().substring(0, 10))
      }
      if (value.type === "number") {
        initialData.append(value.name, 0)
      }
      if (value.type === "options") {
        initialData.append(value.name, "")
      }
      if (value.type === "file") {
        initialData.append(value.name, "")
      }
    });
    return initialData;
  })

  const handleChange = (e) => {
    setFormData((prevFormData) => {
      const newFormData = new FormData(); 
      for (let [key, value] of prevFormData.entries()) {
        newFormData.append(key, value); 
      }
      newFormData.set(e.target.name, e.target.value);
      return newFormData;
    });
  };

  const submitRequest = async (payload) => {
    if (method === "post") {
      let response = await postRequest(target, payload)
    }
    if (method === "put") {

    }
    window.dispatchEvent(sendRefresh);
  }

  const handleFileChange = async (e) => {
    setFormData((prevFormData) => {
      const newFormData = new FormData(); 
      for (let [key, value] of prevFormData.entries()) {
        newFormData.append(key, value); 
      }
      newFormData.set(e.target.name, e.target.files[0]);
      return newFormData;
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    submitRequest(formData)
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit} method={method}>
        {inputs.length >= 0 && (
          inputs.map((input, index) => (
            input.type === "text" ? (
              <div className={styles.text}>
                <label for={input.name}>{input.name}</label>
                <input name={input.name} type={input.type} placeholder={input.name} onChange={handleChange}></input>
              </div>
          ) : 
            input.type === "date" ? (
              <div className={styles.date}>
                <label for={input.name}>{input.name}</label>
                <input name={input.name} type={input.type} defaultValue={new Date().toISOString().substring(0, 10)} onChange={handleChange}></input>
              </div>
          ) :
            input.type === "number" ? (
              <div className={styles.number}>
                <label for={input.name}>{input.name}</label>
                <input name={input.name} defaultValue={0} min="0.00" max="1000" step="0.01" onChange={handleChange}></input>
              </div>
          ) :
            input.type === "options" ? (
              <div className={styles.options}>
                <label for={input.name}>{input.name}</label>
                <select name={input.name} onChange={handleChange}>
                  {input.options.map((option, index) => (
                    <option value={option}>{option}</option>
                  ))}
                </select>
              </div>
          ) :
            input.type === "file" ? (
              <div>
                <label for={input.name}>{input.name}</label>
                <input name={input.name} type="file" onChange={handleFileChange} accept="image/png, image/jpeg, image/jpg"></input>
              </div>
          ) : null
          ))
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Form