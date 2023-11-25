import { Link } from "react-router-dom";
import colors from "../../themes";

const Card = ({ id, title, status }) => {
  return (
    <Link to={`/status/${id}`}>
      <div
        className="group relative w-full cursor-pointer rounded-md border-[1px] border-gray-200 py-4 pl-7 pr-4
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
        <span className="block font-normal text-red-500"></span>
      </div>
    </Link>
  );
};

export default Card;
