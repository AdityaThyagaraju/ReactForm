import { useEffect, useState } from "react";
import TextFormElement from "./TextFormElement";
import "./styles.css";

// <Form submitHandler={submitHandler} inputs={inputs} validation={true} />
// import Form and use this line to use this form in your page

/**
 * @param {submitHandler} - function that handles submit
 * @param {inputs} - array of objects of form {
        name,
        label,
        type,
        validation,
        errorMessage,
        placeholder,
        defaultValue,
        formClass,
        labelClass,
        inputClass,
        submitButtonClass
    }
    @param {validation} - true if validation of fields is requires
 */

const Form = function ({
  submitHandler = () => {},
  inputs = [],
  validation = false
}) {
  let fieldsTemplate = {};
  let inputErrorTemplate = {};
  useEffect(() => {
    inputs.forEach((input) => {
      fieldsTemplate[input.name] = null;
      inputErrorTemplate[input.name] = false;
    });
  }, []);
  const [inputErrors, setInputErrors] = useState(inputErrorTemplate);
  const [values, setValues] = useState(fieldsTemplate);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validation) {
      submitHandler(values);
    } else {
      let Error = false;
      let lInputErrors = {};
      inputs.forEach((input) => {
        if (!input.validation(values[input.name])) {
          lInputErrors[input.name] = true;
          Error = true;
        }
      });
      if (!Error) {
        submitHandler(values);
      }
      setInputErrors(lInputErrors);
    }
  };
  const changeValue = ({ key, value }) => {
    setValues({ ...values, [key]: value });
  };
  return (
    <form onSubmit={handleSubmit}>
      {inputs.map((input, index) => {
        if (
          input.type == "text" ||
          input.type == "email" ||
          input.type == "password" ||
          input.type == "number"
        ) {
          return <TextFormElement {...input} error={inputErrors[input.name]} changeValue={changeValue}/>;
        }
      })}
      <button className={submitButtonClass} type="submit">
        Submit
      </button>
    </form>
  );
};

export { inputTemplateReference };
export default Form;
