import { Link } from "react-router-dom";
import { colors } from "../../themes";

const Card = ({ id, title, status, ocorrencias }) => {
  const statusLinha = status
    ? status.map((linha) => {
        if (linha.id == id) {
          return linha.status;
        }
      })
    : "Status indisponível";

  const numOcorrencias = ocorrencias
    ? ocorrencias.filter((ocorrencia) => {
        return ocorrencia.linha == id;
      })
    : null;

  return (
    <Link className="w-full md:w-auto" to={`/status/${id}`}>
      <div
        className="group relative cursor-pointer rounded-md border-[1px] border-gray-200 py-4 pl-7 pr-4
     shadow-sm transition-all hover:shadow-lg md:w-96"
      >
        <div
          style={{ backgroundColor: `${colors[id]}` }}
          className="absolute -left-4 flex h-8 w-8 
    items-center justify-center rounded-sm font-bold text-white shadow-md transition-all group-hover:translate-x-1"
        >
          {id}
        </div>
        <span className="block font-semibold text-gray-950">
          {title} - {statusLinha}
        </span>
        <span className="mb-5 block font-normal text-gray-400">
          Status segundo Metrô/CPTM
        </span>
        {numOcorrencias ? (
          <span>
            {numOcorrencias.length}{" "}
            {numOcorrencias.length === 1
              ? "ocorrência relatada"
              : "ocorrências relatadas"}{" "}
            na última hora
          </span>
        ) : (
          "Número de ocorrências indisponível"
        )}
      </div>
    </Link>
  );
};

export default Card;
