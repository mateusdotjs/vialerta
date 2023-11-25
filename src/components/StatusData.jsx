import Button from "./Button";
import colors from "../../themes";

const StatusData = ({ id, title, status }) => {
  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-950">
        Linha {id} - {title}
      </h1>
      <div
        style={{ backgroundColor: colors[id] }}
        className="mb-3 h-1 w-2/6 rounded-sm"
      ></div>
      <span className="text-xl font-medium text-gray-950">
        Situação: {status}
      </span>
      <span className="mb-10 text-xl font-medium text-gray-400">
        Status segundo o Metrô/CPTM
      </span>
      <label
        htmlFor="select"
        className="mb-2 text-xl font-semibold text-gray-950"
      >
        Relatar um problema:
      </label>
      <select
        id="select"
        className="mb-2 self-start rounded-md border-[1px] p-2 text-base outline-none"
      >
        <option selected disabled>
          Selecione uma ocorrência
        </option>
        <option>Velocidade reduzida</option>
        <option>Linha paralisada por falha nos trens</option>
        <option>Greve</option>
      </select>
      <Button css={["self-start"]}>Relatar ocorrência</Button>
    </>
  );
};

export default StatusData;
