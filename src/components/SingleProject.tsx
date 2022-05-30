import { Link } from "react-router-dom";
import { fullProjectInterface } from "../utils/interfaces";

interface SingleProjectProps {
  data: fullProjectInterface;
}

export function SingleProject({ data }: SingleProjectProps): JSX.Element {
  return (
    <div className="singleProjectContainer">
      <h2>{data.id}</h2>
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
            {data.employees.map((em) => (
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
        <p>No Fee Recorded</p>
      ) : (
        <h3>£{data.contract.size}</h3>
      )}
    </div>
  );
}
