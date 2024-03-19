const TextFormElement = ({
    index,
    label,
    placeholder,
    defaultValue,
    error,
    errorMessage,
    type,
    name,
    changeValue,
  }) => {
    return (
      <div className="field" key={index}>
        <label className="label">{label}</label>
        <input
          className="input"
          placeholder={placeholder}
          defaultValue={defaultValue}
          type={type}
          name={name}
          onChange={(e) =>
            changeValue({ key: e.target.name, value: e.target.value })
          }
        />
        {error && <span className="error">{errorMessage}</span>}
      </div>
    );
  };
  
  export default TextFormElement;
  