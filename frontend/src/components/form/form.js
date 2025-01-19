import React from 'react'

import styles from "./form.module.css";

function Form({ inputs, action, endpoint }) {

  

  function printClick(e) {
    console.log(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    window.location.reload()
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {inputs.length >= 0 && (
          inputs.map((input, index) => (
            input.type == "text" ? (
              <div className={styles.text}>
                <label for={input.name}>{input.name}</label>
                <input name={input.name} type={input.type} placeholder={input.name}></input>
              </div>
          ) : 
            input.type == "date" ? (
              <div className={styles.date}>
                <label for={input.name}>{input.name}</label>
                <input type={input.type} defaultValue={new Date().toISOString().substring(0, 10)}></input>
              </div>
          ) :
            input.type == "number" ? (
              <div className={styles.number}>
                <label for={input.name}>{input.name}</label>
                <input type={input.type} defaultValue={0}></input>
              </div>
          ) :
            input.type == "options" ? (
              <div className={styles.options}>
                <label for={input.name}>{input.name}</label>
                <select name={input.name}>
                  {input.options.map((option, index) => (
                    <option onClick={printClick} value={option}>{option}</option>
                  ))}
                </select>
              </div>
          ) :
            input.type == "file" ? (
              <div>
                <label for={input.name}>{input.name}</label>
                <input name={input.name} type="file"></input>
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