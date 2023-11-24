const Error = ({ error }) => {
  switch (error) {
    case "Unable to validate email address: invalid format":
      error = "Formato de email inválido";
      break;
    case "User already registered":
      error = "Email já está em uso";
      break;
    case "Invalid login credentials":
      error = "Email ou senha incorretos";
      break;
  }

  return <p className="mt-1 font-semibold text-red-600">{error}</p>;
};

export default Error;
