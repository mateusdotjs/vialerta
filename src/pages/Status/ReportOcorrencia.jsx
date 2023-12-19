import { useContext, useState } from "react";
import Button from "../../components/Button";
import Error from "../../components/Error";
import Select from "../../components/Select";
import { userContext } from "../../contexts/AuthContext";
import { postOcorrencia } from "../../../functions";
import { useParams } from "react-router-dom";

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

const ReportOcorrencia = () => {
  const { user } = useContext(userContext);
  const [type, setType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

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
    <div className="animate-slide">
      <Select
        options={options}
        label={"Reportar uma ocorrência:"}
        setType={setType}
      />
      <Button onClick={handleClick} disabled={loading} css={["w-full"]}>
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
