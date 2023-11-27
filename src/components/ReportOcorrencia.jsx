import { useContext, useState } from "react";
import Button from "./Button";
import Error from "./Error";
import colors from "../../themes";
import { userContext } from "../contexts/AuthContext";
import { postOcorrencia } from "../../functions";
import Select from "./Select";

const options = [
  {
    text: "Selecione uma ocorrência",
    placeholder: true,
  },
  {
    text: "Velocidade reduzida",
  },
  {
    text: "Paralisada - falha nos trens",
  },
  {
    text: "Greve",
  },
];

const ReportOcorrencia = ({ id, title, status }) => {
  const { user } = useContext(userContext);
  const [type, setType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleClick() {
    if (type == null) return;
    setError(null);
    setLoading(true);
    const error = await postOcorrencia(user.id, type, id);
    if (error) setError(error);
    else setError(false);
    setLoading(false);
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-950 md:text-2xl">
        Linha {id} - {title}
      </h1>
      <div
        style={{ backgroundColor: colors[id] }}
        className="mb-3 h-1 w-4/6 rounded-sm md:w-3/6"
      ></div>
      <span className="block text-lg font-medium text-gray-950 md:text-xl">
        Situação: {status}
      </span>
      <span className="mb-10 block text-lg font-medium text-gray-400 md:text-xl">
        Status segundo o Metrô/CPTM
      </span>
      <Select options={options} label={"Reportar um problema:"} setType={setType}/>
      <Button onClick={handleClick} disabled={loading}>
        {loading ? "Carregando..." : "Relatar ocorrência"}
      </Button>
      {error && <Error error={error} />}
      {error === false && (
        <p className="mt-1 font-semibold text-green-600">Ocorrência enviada.</p>
      )}
    </div>
  );
};

export default ReportOcorrencia;
