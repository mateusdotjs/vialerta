import { useState } from "react";
import Select from "./Select";
import Ocorrencia from "./Ocorrencia";

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

const TotalOcorrencias = ({ id }) => {
  const [type, setType] = useState("Todas");

  return (
    <div className="pt-10 md:pt-0">
      <h1 className="mb-3 text-xl font-semibold text-gray-950 md:text-2xl">
        Total de ocorrências
      </h1>
      <Select options={options} setType={setType} />
      <div className="pt-3 flex flex-col gap-1">
        <Ocorrencia id={id} time={"lastHalfHour"} type={type} />
        <Ocorrencia id={id} time={"lastHour"} type={type} />
        <Ocorrencia id={id} time={"lastMonth"} type={type} />
      </div>
    </div>
  );
};

export default TotalOcorrencias;
