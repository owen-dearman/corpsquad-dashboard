import { Action, State } from "../../App";
import {
  fullClientInterface,
  fullEmployeeInterface,
} from "../../utils/interfaces";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useReducer } from "react";
import { formatProjectSize } from "../../utils/formatProjectSize";

export type FilterState = {
  projectSize: { min: null | string; max: null | string };
  clients: string | null;
  employees: string[];
  timeFrame: {
    startBefore: null | string;
    startAfter: null | string;
    endBefore: null | string;
    endAfter: null | string;
  };
}

export type FilterAction = { type: "set-client", clients: string | null }
  | { type: "set-employees", employees: string[] }
  | { type: "set-project-size", projectSize: { min: null | string; max: null | string }; }
  | {
    type: "set-timeFrame", timeFrame: {
      startBefore: null | string;
      startAfter: null | string;
      endBefore: null | string;
      endAfter: null | string;
    }
  }

const FilterReducerFunction = (state: FilterState, action: FilterAction): FilterState => {
  switch (action.type) {
    case "set-client":
      return {
        ...state,
        clients: action.clients
      };
    case "set-employees":
      return {
        ...state,
        employees: action.employees
      };
    case "set-project-size":
      return {
        ...state,
        projectSize: action.projectSize
      }
    case "set-timeFrame":
      return {
        ...state,
        timeFrame: action.timeFrame
      }
  }
}

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

  const [{ projectSize, clients, employees, timeFrame }, filterDispatch] = useReducer(FilterReducerFunction, filters)

  employeeList = employeeList.sort((a, b) => a.name.localeCompare(b.name));
  clientList = clientList.sort((a, b) => a.name.localeCompare(b.name));

  function handleSubmit() {
    const updatedFilters = { projectSize: projectSize, clients: clients, employees: employees, timeFrame: timeFrame }
    dispatch({ type: "set-filters", results: updatedFilters });
  }


  function handleClear() {
    dispatch({ type: "set-filters", results: { ...filters, clients: null } })
    filterDispatch({ type: "set-employees", employees: [] })
    filterDispatch({ type: "set-project-size", projectSize: { min: null, max: null } })
    filterDispatch({
      type: "set-timeFrame", timeFrame: {
        startBefore: null,
        startAfter: null,
        endBefore: null,
        endAfter: null,
      }
    })
    const emptyFilters = {
      projectSize: { min: null, max: null },
      clients: null,
      employees: [],
      timeFrame: {
        startBefore: null,
        startAfter: null,
        endBefore: null,
        endAfter: null,
      },
    };
    dispatch({ type: "set-filters", results: emptyFilters });
  }

  function handleSelectChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ): void {
    const { name, value } = event.target;
    if (name === "clients") {
      if (value === "All") {
        dispatch({ type: "set-filters", results: { ...filters, clients: null } })
      } else {
        dispatch({ type: "set-filters", results: { ...filters, clients: value } })
      }
    } else if (name === "employees") {
      if (value === "All") {
        filterDispatch({ type: "set-employees", employees: [] })
      } else {
        filterDispatch({ type: "set-employees", employees: [...employees, value] })
      }
    }
  }

  type DateClass = "startBefore" | "startAfter" | "endBefore" | "endAfter";

  function handleDate(date: Date, dateClass: DateClass) {
    const formattedDate = date.toString().substring(0, 15);
    if (dateClass === "startBefore") {
      filterDispatch({ type: "set-timeFrame", timeFrame: { ...timeFrame, startBefore: formattedDate } })
    } else if (dateClass === "startAfter") {
      filterDispatch({ type: "set-timeFrame", timeFrame: { ...timeFrame, startAfter: formattedDate } })
    } else if (dateClass === "endBefore") {
      filterDispatch({ type: "set-timeFrame", timeFrame: { ...timeFrame, endBefore: formattedDate } })
    } else {
      filterDispatch({ type: "set-timeFrame", timeFrame: { ...timeFrame, endAfter: formattedDate } })
    }
  }

  function handleProjectSize(input: string, sizeClass: string) {
    if (sizeClass === "min") {
      filterDispatch({ type: "set-project-size", projectSize: { ...projectSize, min: input } })
    } else if (sizeClass === "max") {
      filterDispatch({ type: "set-project-size", projectSize: { ...projectSize, max: input } })
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
        <option value="All">All Clients</option>
        {clientList.map((client) => (
          <option value={client.id} key={client.id}>
            {client.name}
          </option>
        ))}
      </select>
      <select
        // defaultValue={"All"}
        name="employees"
        placeholder={"Filter By Employee"}
        onChange={(e) => handleSelectChange(e)}
      >
        <option value="All">All Employees</option>
        {employeeList.map((employee) => (
          <option value={employee.id} key={employee.id}>
            {employee.name}
          </option>
        ))}
      </select>
      <DatePicker
        placeholderText="Projects Started Before"
        onChange={(date) => {
          date && handleDate(date, "startBefore");
        }}
      ></DatePicker>
      <DatePicker
        placeholderText="Projects Started After"
        onChange={(date) => {
          date && handleDate(date, "startAfter");
        }}
      ></DatePicker>
      <DatePicker
        placeholderText="Projects Completed Before"
        onChange={(date) => {
          date && handleDate(date, "endBefore");
        }}
      ></DatePicker>
      <DatePicker
        placeholderText="Projects Completed After"
        onChange={(date) => {
          date && handleDate(date, "endAfter");
        }}
      ></DatePicker>
      <input
        value={projectSize.min ? projectSize.min : ""}
        type="number"
        placeholder="Project Size Greater Than..."
        onChange={(e) => handleProjectSize(e.target.value, "min")}
      />
      <input
        value={projectSize.max ? projectSize.max : ""}
        type="number"
        placeholder="Project Size Smaller Than..."
        onChange={(e) => handleProjectSize(e.target.value, "max")}
      />
      <button onClick={handleSubmit}>Apply Filters</button>
      <button onClick={handleClear}>Clear Filters</button>
      <h4>Filters:</h4>
      {filters.clients && (
        <p key={filters.clients}>Client: {filters.clients}</p>
      )}
      {employees.length > 0 && (
        <div>
          Employees:{" "}
          {employees.map((employee) => (
            <p key={employee}>{employee}</p>
          ))}
        </div>
      )}
      {filters.timeFrame.startBefore && (
        <p>Projects Starting Before: {filters.timeFrame.startBefore}</p>
      )}
      {filters.timeFrame.startAfter && (
        <p>Projects Starting After: {filters.timeFrame.startAfter}</p>
      )}
      {filters.timeFrame.endBefore && (
        <p>Projects Ending Before: {filters.timeFrame.endBefore}</p>
      )}
      {filters.timeFrame.endAfter && (
        <p>Projects Ending After: {filters.timeFrame.endAfter}</p>
      )}
      {filters.projectSize.min && (
        <p>
          Project Size {">"} {formatProjectSize(filters.projectSize.min)}
        </p>
      )}
      {filters.projectSize.max && (
        <p>
          Project Size {"<"} {formatProjectSize(filters.projectSize.max)}
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
