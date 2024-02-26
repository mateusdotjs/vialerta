import Input from "../global/Input";
import Button from "../global/Button";
import useField from "../../hooks/useField";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../../contexts/AuthContext";
import Error from "../global/Error";
import { Navigate } from "react-router-dom";

const Register = () => {
  const { loggedIn, loading, createUser, error, setError } =
    useContext(userContext);
  const email = useField("email");
  const password = useField("password");
  const nome = useField(undefined);

  function handleClick(event) {
    event.preventDefault();

    if (nome.error || email.error || password.error) {
      setError("Preencha os campos corretamente");
      return;
    }

    if (nome.value == "" || email.value == "" || password.value == "") {
      setError("Preencha todos os campos");
      return;
    }

    createUser(nome.value, email.value, password.value);
  }
  if (loggedIn == true) return <Navigate to="/home" />;
  return (
    <div className="animate-slide">
      <form className="mb-7">
        <h1 className="mb-5 text-2xl font-bold text-gray-900">
          Crie sua conta
        </h1>
        <Input
          name={"Primeiro nome"}
          type={"text"}
          placeholder={"Nome"}
          css={["mb-5"]}
          {...nome}
        />
        <Input
          name={"Email"}
          type={"email"}
          placeholder={"exemplo@email.com"}
          css={["mb-5"]}
          {...email}
        />
        <Input
          name={"Senha (Mínimo 6 caracteres)"}
          type={"password"}
          placeholder={"••••••"}
          css={["mb-7"]}
          {...password}
        />
        <Button css={["w-full mb-2"]} disabled={loading} onClick={handleClick}>
          {loading ? "Carregando..." : "Cadastrar"}
        </Button>
        {error && <Error error={error} />}
      </form>
      <span className="text-gray-600">
        Já tem uma conta?{" "}
        <Link className="font-medium text-sky-700 underline" to={"/login"}>
          Faça login
        </Link>
      </span>
    </div>
  );
};

export default Register;
