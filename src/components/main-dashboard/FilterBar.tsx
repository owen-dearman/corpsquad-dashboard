import { Action, State } from "../../App";
import {
  fullClientInterface,
  fullEmployeeInterface,
} from "../../utils/interfaces";

interface FilterBarProps {
  clientList: fullClientInterface[];
  employeeList: fullEmployeeInterface[];
  dispatch: React.Dispatch<Action>;
  filters: State["filters"];
}

export function FilterBar({
  clientList,
  employeeList,
  dispatch,
  filters,
}: FilterBarProps): JSX.Element {
  function handleSubmit() {
    dispatch({ type: "set-filters", results: filters });
  }

  function handleClear() {
    const emptyFilters = {
      projectSize: { min: null, max: null },
      clients: [],
      employees: [],
      timeFrame: { start: null, end: null },
    };
    dispatch({ type: "set-filters", results: emptyFilters });
  }

  function handleSelectChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ): void {
    const { name, value } = event.target;
    if (name === "clients") {
      if (value === "All") {
        filters.clients = [];
      } else {
        filters.clients.push(value);
      }
    } else if (name === "employees") {
      if (value === "All") {
        filters.employees = [];
      } else {
        filters.employees.push(value);
      }
    }
  }

  return (
    <div>
      <select
        name="clients"
        placeholder={"Filter By Client"}
        onChange={(e) => handleSelectChange(e)}
      >
        <option>All Clients</option>
        {clientList.map((client) => (
          <option value={client.id} key={client.id}>
            {client.name}
          </option>
        ))}
      </select>
      <select
        name="employees"
        placeholder={"Filter By Employee"}
        onChange={(e) => handleSelectChange(e)}
      >
        <option>All Employees</option>
        {employeeList.map((employee) => (
          <option value={employee.id} key={employee.id}>
            {employee.name}
          </option>
        ))}
      </select>
      <button onClick={handleSubmit}>Apply Filters</button>
      <button onClick={handleClear}>Clear All Filters</button>
      <h4>Active Filters:</h4>
      <div>
        Clients:{" "}
        {filters.clients.map((c) => (
          <p key={c}>{c}</p>
        ))}
      </div>
      <div>
        Employees:{" "}
        {filters.employees.map((c) => (
          <p key={c}>{c}</p>
        ))}
      </div>
    </div>
  );
}

/*
  filters?: {
    projectSize: { min: null; max: null };
    clients: [];
    employees: [];
    timeFrame: { start: null; end: null };
  };
*/
