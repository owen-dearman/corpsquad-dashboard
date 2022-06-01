import { Link } from "react-router-dom";
import { formatProjectSize } from "../utils/formatProjectSize";
import { fullProjectInterface } from "../utils/interfaces";

interface SingleProjectProps {
  data: fullProjectInterface;
}

export function SingleProject({ data }: SingleProjectProps): JSX.Element {
  const employeeList = data.employees.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="singleProjectContainer">
      <h2 className="projectTitle">{data.id}</h2>
      <h3>
        <strong>{data.client.name}</strong>
      </h3>
      <h3 style={{ marginTop: "-20px" }}>
        <Link className="navLink" to={`/clients/${data.client.id}`}>
          {data.client.id}
        </Link>
      </h3>

      {data.employees.length > 0 ? (
        <>
          <h3>Employees: {data.employees.length}</h3>
          <div className="employeeList">
            {employeeList.map((em) => (
              <li key={em.id}>
                <strong>{em.name}</strong>{" "}
                <Link className="navLink" to={`/employees/${em.id}`}>
                  {em.id}
                </Link>
              </li>
            ))}
          </div>
        </>
      ) : (
        <p>No Employees Recorded</p>
      )}
      <h3>
        {data.contract.startDate} - {data.contract.endDate}
      </h3>
      {data.contract.size === "0.00" ? (
        <p>No Fee</p>
      ) : (
        <h3>{formatProjectSize(data.contract.size)}</h3>
      )}
    </div>
  );
}
