import { useState } from "react";

const typesValidation = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    error: "Preencha com um email válido",
  },
  password: {
    regex: /^.{6,}$/,
    error: "Preencha com pelo menos 6 caracteres",
  },
};

const useField = (type) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);

  function validate(type) {
    const validation = typesValidation[type].regex.test(value);
    if (!validation) setError(typesValidation[type].error);
  }

  function onChange({ target }) {
    if (error) setError(null);
    setValue(target.value);
  }

  function onBlur() {
    if (value === "") {
      setError("Preencha o campo");
      return;
    }
    if (type === undefined || type === "") return;
    validate(type);
  }

  return { value, setValue, onChange, error, onBlur };
};

export default useField;
