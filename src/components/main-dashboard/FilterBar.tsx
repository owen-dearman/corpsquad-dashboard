import { Action, State } from "../../App";
import {
  fullClientInterface,
  fullEmployeeInterface,
} from "../../utils/interfaces";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getNameOfEmployee } from "../../utils/addClientsAndEmployeesToProjects";

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

  type DateClass = "startBefore" | "startAfter" | "endBefore" | "endAfter";

  function handleDate(date: Date, dateClass: DateClass) {
    const formattedDate = date.toString().substring(0, 15);
    if (dateClass === "startBefore") {
      dispatch({
        type: "set-filters",
        results: {
          ...filters,
          timeFrame: { ...filters.timeFrame, startBefore: formattedDate },
        },
      });
    } else if (dateClass === "startAfter") {
      dispatch({
        type: "set-filters",
        results: {
          ...filters,
          timeFrame: { ...filters.timeFrame, startAfter: formattedDate },
        },
      });
    } else if (dateClass === "endBefore") {
      dispatch({
        type: "set-filters",
        results: {
          ...filters,
          timeFrame: { ...filters.timeFrame, endBefore: formattedDate },
        },
      });
    } else {
      dispatch({
        type: "set-filters",
        results: {
          ...filters,
          timeFrame: { ...filters.timeFrame, endAfter: formattedDate },
        },
      });
    }
  }

  function handleProjectSize(input: string, sizeClass: string) {
    if (sizeClass === "min") {
      dispatch({
        type: "set-filters",
        results: {
          ...filters,
          projectSize: { ...filters.projectSize, min: input },
        },
      });
    } else if (sizeClass === "max") {
      dispatch({
        type: "set-filters",
        results: {
          ...filters,
          projectSize: { ...filters.projectSize, max: input },
        },
      });
    }
  }

  return (
    <div className="filterStyling">
      <section className="filterContainer">
        <select
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
        <select
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
            Employees:{" "}
            {filters.employees.map((employee) => (
              <p key={employee}>{getNameOfEmployee(employee, employeeList)}</p>
            ))}
          </div>
        )}
        <input
          value={filters.projectSize.min ? filters.projectSize.min : ""}
          type="number"
          placeholder="Project Size Greater Than..."
          onChange={(e) => handleProjectSize(e.target.value, "min")}
        />
        <input
          value={filters.projectSize.max ? filters.projectSize.max : ""}
          type="number"
          placeholder="Project Size Smaller Than..."
          onChange={(e) => handleProjectSize(e.target.value, "max")}
        />
      </section>
      <section className="filterContainer">
        <DatePicker
          className="datepicker"
          value={
            filters.timeFrame.startBefore ? filters.timeFrame.startBefore : ""
          }
          placeholderText="Projects Started Before"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          onChange={(date) => {
            date && handleDate(date, "startBefore");
          }}
        ></DatePicker>
        <DatePicker
          className="datepicker"
          value={
            filters.timeFrame.startAfter ? filters.timeFrame.startAfter : ""
          }
          placeholderText="Projects Started After"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          onChange={(date) => {
            date && handleDate(date, "startAfter");
          }}
        ></DatePicker>
        <DatePicker
          className="datepicker"
          value={filters.timeFrame.endBefore ? filters.timeFrame.endBefore : ""}
          placeholderText="Projects Completed Before"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          onChange={(date) => {
            date && handleDate(date, "endBefore");
          }}
        ></DatePicker>
        <DatePicker
          className="datepicker"
          value={filters.timeFrame.endAfter ? filters.timeFrame.endAfter : ""}
          placeholderText="Projects Completed After"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          onChange={(date) => {
            date && handleDate(date, "endAfter");
          }}
        ></DatePicker>
      </section>
      <button className="clearButton" onClick={handleClear}>
        Clear Filters
      </button>
    </div>
  );
}
