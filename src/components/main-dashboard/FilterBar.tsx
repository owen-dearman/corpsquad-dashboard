import { Action, State } from "../../App";
import {
  fullClientInterface,
  fullEmployeeInterface,
} from "../../utils/interfaces";
import { getNameOfEmployee } from "../../utils/addClientsAndEmployeesToProjects";
import { FilterByDate } from "./FilterByDate";
import { FilterByProjectSize } from "./FilterByProjectSize";

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

  function handleClear() {
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
        dispatch({
          type: "set-filters",
          results: { ...filters, clients: null },
        });
      } else {
        dispatch({
          type: "set-filters",
          results: { ...filters, clients: value },
        });
      }
    } else if (name === "employees") {
      if (value === "All") {
        dispatch({
          type: "set-filters",
          results: { ...filters, employees: [] },
        });
      } else {
        dispatch({
          type: "set-filters",
          results: { ...filters, employees: [...filters.employees, value] },
        });
      }
    }
  }

  return (
    <>
      <div className="filterStyling">
        <div className="filterContainer">
          <p>Filter</p>
          <button className="clearButton" onClick={handleClear}>
            Clear Filters
          </button>
        </div>
        <section className="filterContainer">
          <p>By Client</p>
          <select
            className="filterInput"
            name="clients"
            value={filters.clients ? filters.clients : ""}
            placeholder={"Select Client"}
            onChange={(e) => handleSelectChange(e)}
          >
            <option value="All">All Clients</option>
            {clientList.map((client) => (
              <option value={client.id} key={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </section>
        <section className="filterContainer">
          <p>By Employee(s)</p>
          <select
            className="filterInput"
            value={
              filters.employees.length > 0
                ? filters.employees[filters.employees.length - 1]
                : ""
            }
            name="employees"
            placeholder={"Select Employee(s)"}
            onChange={(e) => handleSelectChange(e)}
          >
            <option value="All">All Employees</option>
            {employeeList.map((employee) => (
              <option value={employee.id} key={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
          {filters.employees.length > 0 && (
            <div>
              {filters.employees.map((employee) => (
                <p className="employeeFilterList" key={employee}>
                  {getNameOfEmployee(employee, employeeList)}
                </p>
              ))}
            </div>
          )}
        </section>
        <section className="filterContainer">
          <p>By Project Size</p>
          <FilterByProjectSize filters={filters} dispatch={dispatch} />
        </section>
        <section className="filterContainer">
          <p>By Date(s)</p>
          <FilterByDate filters={filters} dispatch={dispatch} />
        </section>
      </div>
    </>
  );
}
