import { useEffect, useState } from "react";
import Select from "./Select";
import { getTotalOcorrencias } from "../../../functions";
import { useParams } from "react-router-dom";

const options = [
  {
    text: "Todas",
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

const TotalOcorrencias = () => {
  const [ocorrencias, setOcorrencias] = useState(null);
  const [type, setType] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const intervals = [
      {
        interval: "lastMonth",
        callback: (count) => {
          setOcorrencias((ocorrencias) => ({ ...ocorrencias, mes: count }));
        },
      },
      {
        interval: "lastHour",
        callback: (count) =>
          setOcorrencias((ocorrencias) => ({
            ...ocorrencias,
            hora: count,
          })),
      },
      {
        interval: "halfHour",
        callback: (count) =>
          setOcorrencias((ocorrencias) => ({
            ...ocorrencias,
            meiaHora: count,
          })),
      },
    ];

    async function getCount(interval, callback) {
      const { count, error } = await getTotalOcorrencias(id, type, interval);
      if (error) {
        callback(null);
        return Promise.reject(error);
      }
      callback(count.toString());
    }

    setLoading(true);
    Promise.allSettled(
      intervals.map((func) => getCount(func.interval, func.callback)),
    ).finally(() => setLoading(false));
  }, [id, type]);

  return (
    <div className=" animate-slide">
      <h1 className="mb-3 text-lg font-semibold text-gray-950 md:text-xl">
        Total de ocorrências relatadas:
      </h1>
      <Select options={options} setType={setType} />
      {loading ? (
        "Carregando..."
      ) : (
        <table>
          <tbody>
            <tr>
              <th className="text-left">Nos últimos 30 minutos</th>
              <td className="pl-2">
                {ocorrencias.meiaHora
                  ? ocorrencias.meiaHora
                  : "Dado indisponível"}
              </td>
            </tr>
            <tr>
              <th className="text-left">Na última hora</th>
              <td className="pl-2">
                {ocorrencias.hora ? ocorrencias.hora : "Dado indisponível"}
              </td>
            </tr>
            <tr>
              <th className="text-left">Neste mês</th>
              <td className="pl-2">
                {ocorrencias.mes ? ocorrencias.mes : "Dado indisponível"}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TotalOcorrencias;
