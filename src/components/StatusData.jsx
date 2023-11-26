import Button from "./Button";
import Error from "./Error";
import colors from "../../themes";
import { useContext, useState } from "react";
import { supabase } from "../../supabase";
import { userContext } from "../contexts/AuthContext";

const StatusData = ({ id, title, status }) => {
  const { user } = useContext(userContext);
  const [type, setType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleClick() {
    if (type == null) return;
    setError(null);
    setLoading(true);
    const { error } = await supabase
      .from("ocorrencias")
      .insert({ user: user.id, type, linha: id });
    if (error) setError(error.message);
    else setError(false);
    setLoading(false);
  }

  return (
    <>
      <h1 className="text-xl font-semibold text-gray-950 md:text-2xl">
        Linha {id} - {title}
      </h1>
      <div
        style={{ backgroundColor: colors[id] }}
        className="mb-3 h-1 w-3/6 rounded-sm md:w-2/6"
      ></div>
      <span className="text-lg font-medium text-gray-950 md:text-xl">
        Situação: {status}
      </span>
      <span className="mb-10 text-lg font-medium text-gray-400 md:text-xl">
        Status segundo o Metrô/CPTM
      </span>
      <label
        htmlFor="select"
        className="mb-2 text-lg font-semibold text-gray-950 md:text-xl"
      >
        Relatar um problema:
      </label>
      <select
        id="select"
        className="mb-2 self-start rounded-md border-[1px] p-2 outline-none"
        onChange={({ target }) => setType(target.value)}
      >
        <option selected disabled>
          Selecione uma ocorrência
        </option>
        <option>Velocidade reduzida</option>
        <option>Paralisada - falha nos trens</option>
        <option>Greve</option>
      </select>
      <Button css={["self-start"]} onClick={handleClick} disabled={loading}>
        {loading ? "Carregando..." : "Relatar ocorrência"}
      </Button>
      {error && <Error error={error} />}
      {error === false && (
        <p className="mt-1 font-semibold text-green-600">Ocorrência enviada.</p>
      )}
    </>
  );
};

export default StatusData;
