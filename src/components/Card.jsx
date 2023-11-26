import { Link } from "react-router-dom";
import colors from "../../themes";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase";

const Card = ({ id, title, status }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 30);

    async function getOcorrencias() {
      const { count, error } = await supabase
        .from("ocorrencias")
        .select("*", { count: "exact", head: true })
        .eq("linha", id)
        .gt("created_at", date.toISOString());

      console.log(error, count);
      if (error) return null;
      setCount(count);
    }

    getOcorrencias();
  }, [id]);

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
          {title} - {status}
        </span>
        <span className="mb-5 block font-normal text-gray-400">
          Status segundo Metrô/CPTM
        </span>
        {count > 0 ? (
          <span className="block font-normal text-red-500">
            Foram reportadas {count} ocorrências nos últimos 30 minutos
          </span>
        ) : (
          <span className="block font-normal text-green-600">
            Não houve nenhuma ocorrência nos últimos 30 minutos
          </span>
        )}
      </div>
    </Link>
  );
};

export default Card;
