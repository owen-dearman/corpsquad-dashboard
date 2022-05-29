import { projectInterface } from "../../utils/interfaces";

interface SingleProjectProps {
  data: projectInterface;
}

export function SingleProject({ data }: SingleProjectProps): JSX.Element {
  return (
    <div className="singleProjectContainer">
      <h3>{data.id}</h3>
      <h4>Client ID: {data.clientId}</h4>
      <h4>Client Name:</h4>
      <h5>Employees:</h5>
      <h6>
        {data.contract.startDate} - {data.contract.endDate}
      </h6>
      <h6>£{data.contract.size}</h6>
    </div>
  );
}
