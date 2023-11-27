import ReportOcorrencia from "./ReportOcorrencia";
import TotalOcorrencias from "./TotalOcorrencias";

const StatusData = ({ id, title, status }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <ReportOcorrencia id={id} title={title} status={status} />
      <TotalOcorrencias id={id} />
    </div>
  );
};

export default StatusData;
