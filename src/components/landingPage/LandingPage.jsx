import { Link } from "react-router-dom";
import Button from "../global/Button";

const LandingPage = () => {
  return (
    <>
      <section className="bg-blur bg-no-repeat bg-cover bg-center flex flex-1 flex-col items-center justify-center gap-7 px-3">
        <h1 className="text-center text-3xl font-semibold md:max-w-xl md:text-5xl">
          Atualizações em tempo real sobre as linhas de metrô 🚈
        </h1>
        <h2 className="text-center text-gray-600 md:max-w-5xl md:text-xl">
          Fique ciente de greves, falhas técnicas e outros problemas que podem
          atrapalhar seu dia a dia no transporte, com informações fornecidas
          pela comunidade.
        </h2>
        <Link to={"/login/register"}>
          <Button>Crie sua conta agora</Button>
        </Link>
      </section>
    </>
  );
};

export default LandingPage;
