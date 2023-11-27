import { useEffect, useState } from "react";
import { getTotalOcorrencias } from "../../functions";
import Error from "./Error";

const Ocorrencia = ({ time, id, type }) => {
  const [loading, setLoading] = useState(false);
  const [timespan, setTimespan] = useState(null);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(null);

  useEffect(() => {
    let date = new Date();

    switch (time) {
      case "lastHalfHour":
        date = null;
        setTimespan("na última meia hora");
        break;

      case "lastHour":
        date.setMinutes(date.getMinutes() - 60);
        setTimespan("na última hora");
        break;

      case "lastMonth":
        date.setHours(0, 0, 0, 0);
        date.setDate(1);
        setTimespan("neste mês");
        break;

      default:
        date = null;
        break;
    }

    async function getOcorrencias() {
      setError(null);
      setLoading(true);
      const response = await getTotalOcorrencias(id, type, date);
      if (response.error) {
        setError(response.error);
        return;
      }
      setCount(response.count);
      setLoading(false);
    }

    getOcorrencias();
  }, [type, id, time]);

  if (loading)
    return (
      <>
        Aguarde...
        <br />
      </>
    );
  if (error) return <Error error={error} />;
  return (
    <span
      className={`block text-base ${
        count > 0 ? "font-semibold text-red-600" : "text-green-600"
      }`}
    >
      {count > 0 ? count : 0} {count == 1 ? "ocorrência" : "ocorrências"}{" "}
      {timespan}
    </span>
  );
};

export default Ocorrencia;
