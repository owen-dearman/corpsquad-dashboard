import { Action, State } from "../../App";
import {
  fullClientInterface,
  fullEmployeeInterface,
} from "../../utils/interfaces";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  employeeList = employeeList.sort((a, b) => a.name.localeCompare(b.name));
  clientList = clientList.sort((a, b) => a.name.localeCompare(b.name));

  function handleSubmit() {
    console.log(filters);
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

  function handleDate(date: Date, dateClass: string) {
    const formattedDate = date.toString().substring(0, 15);
    if (dateClass === "start") {
      filters.timeFrame.start = formattedDate;
    } else if (dateClass === "end") {
      filters.timeFrame.end = formattedDate;
    }
  }

  function handleProjectSize(input: string, sizeClass: string) {
    if (sizeClass === "min") {
      filters.projectSize.min = input;
    } else if (sizeClass === "max") {
      filters.projectSize.max = input;
    }
  }

  return (
    <div>
      <select
        name="clients"
        defaultValue={"All"}
        placeholder={"Filter By Client"}
        onChange={(e) => handleSelectChange(e)}
      >
        <option>All</option>
        {clientList.map((client) => (
          <option value={client.id} key={client.id}>
            {client.name}
          </option>
        ))}
      </select>
      <select
        defaultValue={"All"}
        name="employees"
        placeholder={"Filter By Employee"}
        onChange={(e) => handleSelectChange(e)}
      >
        <option>All</option>
        {employeeList.map((employee) => (
          <option value={employee.id} key={employee.id}>
            {employee.name}
          </option>
        ))}
      </select>
      <DatePicker
        placeholderText="Projects Started After"
        onChange={(date) => {
          date && handleDate(date, "start");
        }}
      ></DatePicker>
      <DatePicker
        placeholderText="Projects Completed Before"
        onChange={(date) => {
          date && handleDate(date, "end");
        }}
      ></DatePicker>
      <input
        type="number"
        placeholder="Project Size Greater Than..."
        onChange={(e) => handleProjectSize(e.target.value, "min")}
      />
      <input
        type="number"
        placeholder="Project Size Smaller Than..."
        onChange={(e) => handleProjectSize(e.target.value, "max")}
      />
      <button onClick={handleSubmit}>Apply Filters</button>
      <button onClick={handleClear}>Clear Filters</button>
      <h4>Active Filters:</h4>
      {filters.clients.length > 0 && (
        <div>
          {filters.clients.map((client) => (
            <p key={client}>Client: {client}</p>
          ))}
        </div>
      )}
      {filters.employees.length > 0 && (
        <div>
          Employees:{" "}
          {filters.employees.map((employee) => (
            <p key={employee}>{employee}</p>
          ))}
        </div>
      )}
      {filters.timeFrame.start !== null && (
        <p>Start Date: {filters.timeFrame.start}</p>
      )}
      {filters.timeFrame.end !== null && (
        <p>End Date: {filters.timeFrame.end}</p>
      )}
      {filters.projectSize.min && (
        <p>
          Project Size {">"} £{filters.projectSize.min}
        </p>
      )}
      {filters.projectSize.max && (
        <p>
          Project Size {"<"} £{filters.projectSize.max}
        </p>
      )}
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
