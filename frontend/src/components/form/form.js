import React from 'react'
import { useState } from 'react'

import styles from "./form.module.css";
import { postRequest } from '../../services/utils.tsx'

const sendRefresh = new Event('componentRefresh');

function Form({ inputs, method, target }) {

  const[formData, setFormData] = useState(() => {
    let initialData = {};
    inputs.map((value, index) => {
      if (value.type === "text") {
        initialData[value.name] = "";
      }
      if (value.type === "date") {
        initialData[value.name] = new Date().toISOString().substring(0, 10);
      }
      if (value.type === "number") {
        initialData[value.name] = 0;
      }
      if (value.type === "options") {
        initialData[value.name] = "";
      }
      if (value.type === "file") {
        initialData[value.name] = "";
      }
    });
    return initialData;
  })

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const submitRequest = async (payload) => {
    if (method === "post") {
      let response = await postRequest(target, payload)
    }
    if (method === "put") {

    }
    window.dispatchEvent(sendRefresh);
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
                <input name={input.name} type="file" onChange={handleChange}></input>
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