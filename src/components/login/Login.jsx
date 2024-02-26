import Input from "../global/Input";
import Button from "../global/Button";
import { Link, Navigate } from "react-router-dom";
import useField from "../../hooks/useField";
import { useContext } from "react";
import { userContext } from "../../contexts/AuthContext";
import Error from "../global/Error";

const LoginCreate = () => {
  const { loading, login, error, setError, loggedIn } = useContext(userContext);
  const email = useField("email");
  const password = useField("password");

  function handleClick(event) {
    event.preventDefault();

    if (email.error || password.error) {
      setError("Preencha os campos corretamente");
      return;
    }

    if (email.value == "" || password.value == "") {
      setError("Preencha todos os campos");
      return;
    }

    login(email.value, password.value);
  }

  if (loggedIn == true) return <Navigate to="/home" />;
  return (
    <div className="animate-slide">
      <form className="mb-7">
        <h1 className="mb-5 text-xl font-bold text-gray-900 md:text-2xl">
          Acesse sua conta
        </h1>
        <Input
          name={"Email"}
          type={"email"}
          placeholder={"exemplo@email.com"}
          css={["mb-5"]}
          {...email}
        />
        <Input
          name={"Senha"}
          type={"password"}
          placeholder={"••••••"}
          css={["mb-2"]}
          {...password}
        />
        <span className="mb-5 inline-block font-medium text-sky-700">
          Esqueci a senha
        </span>
        <Button css={["w-full"]} disabled={loading} onClick={handleClick}>
          {loading ? "Carregando..." : "Entrar"}
        </Button>
        {error && <Error error={error} />}
      </form>
      <span className="text-gray-600">
        Não tem uma conta?{" "}
        <Link className="font-medium text-sky-700 underline" to={"register"}>
          Cadastre-se aqui
        </Link>
      </span>
    </div>
  );
};

export default LoginCreate;
