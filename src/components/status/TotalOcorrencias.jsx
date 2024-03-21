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

const dateIntervals = [
  {
    name: "lastMonth",
    stateName: "mes",
    header: "No último mês:",
  },
  {
    name: "lastWeek",
    stateName: "semana",
    header: "Na última semana:",
  },
  {
    name: "lastDay",
    stateName: "dia",
    header: "No último dia:",
  },
  {
    name: "lastHour",
    stateName: "hora",
    header: "Na última hora:",
  },
];

const TotalOcorrencias = () => {
  const [ocorrencias, setOcorrencias] = useState(null);
  const [type, setType] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const intervals = dateIntervals.map((dateInterval) => {
      return {
        interval: dateInterval.name,
        callback: (count) => {
          setOcorrencias((ocorrencias) => ({
            ...ocorrencias,
            [dateInterval.stateName]: count,
          }));
        },
      };
    });

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
      intervals.map((func) => getCount(func.interval, func.callback))
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
            {dateIntervals.map((interval) => {
              return (
                <tr key={interval.header}>
                  <th className="text-left">{interval.header}</th>
                  <td className="pl-2">
                    {ocorrencias[interval.stateName]
                      ? ocorrencias[interval.stateName]
                      : "Dado indisponível"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TotalOcorrencias;
