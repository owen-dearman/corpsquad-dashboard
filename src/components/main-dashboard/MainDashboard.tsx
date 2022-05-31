import {
  fullClientInterface,
  fullEmployeeInterface,
  fullProjectInterface,
} from "../../utils/interfaces";
import { FilterBar } from "./FilterBar";
import { SingleProject } from "../SingleProject";
import { StatisticsOverview } from "./StatisticsOverview";
import { Action, State } from "../../App";
import { applyFilters } from "../../utils/applyFilters";
import { convertDateToComparable } from "../../utils/convertDateToComparable";

export type SortTypes =
  | "startDateAscending"
  | "startDateDescending"
  | "endDateAscending"
  | "endDateDescending"
  | "sizeAscending"
  | "sizeDescending";

interface MainDashboardProps {
  projectData: fullProjectInterface[];
  clientList: fullClientInterface[];
  employeeList: fullEmployeeInterface[];
  dispatch: React.Dispatch<Action>;
  filters: State["filters"];
  activeSort: SortTypes;
}

export function MainDashboard({
  projectData,
  clientList,
  employeeList,
  dispatch,
  filters,
  activeSort,
}: MainDashboardProps): JSX.Element {
  const filteredList = applyFilters(projectData, filters);
  const projectList = filteredList.map((proj) => (
    <SingleProject key={proj.id} data={proj} />
  ));

  function handleSort(sortClass: SortTypes) {
    switch (sortClass) {
      case "startDateAscending":
        projectData = projectData.sort(
          (a, b) =>
            parseInt(convertDateToComparable(a.contract.startDate)) -
            parseInt(convertDateToComparable(b.contract.startDate))
        );
        break;
      case "startDateDescending":
        projectData = projectData.sort(
          (a, b) =>
            parseInt(convertDateToComparable(b.contract.startDate)) -
            parseInt(convertDateToComparable(a.contract.startDate))
        );
        break;
      case "endDateAscending":
        projectData = projectData.sort(
          (a, b) =>
            parseInt(convertDateToComparable(a.contract.endDate)) -
            parseInt(convertDateToComparable(b.contract.endDate))
        );
        break;
      case "endDateDescending":
        projectData = projectData.sort(
          (a, b) =>
            parseInt(convertDateToComparable(b.contract.endDate)) -
            parseInt(convertDateToComparable(a.contract.endDate))
        );
        break;
      case "sizeAscending":
        projectData = projectData.sort(
          (a, b) => parseInt(a.contract.size) - parseInt(b.contract.size)
        );
        break;
      case "sizeDescending":
        projectData = projectData.sort(
          (a, b) => parseInt(b.contract.size) - parseInt(a.contract.size)
        );

        break;
    }
    dispatch({ type: "sort-projects", data: projectData, sort: sortClass });
  }

  return (
    <div>
      <StatisticsOverview
        projects={projectData}
        clients={clientList}
        employees={employeeList}
      />
      <FilterBar
        clientList={clientList}
        employeeList={employeeList}
        dispatch={dispatch}
        filters={filters}
      />
      <h2 style={{ textAlign: "center" }}>
        Showing {projectList.length} Projects:
      </h2>
      <div className="sortButtonContainer">
        <p>Start Date</p>
        {activeSort === "startDateAscending" ? (
          <button
            className="sortButtonActive"
            onClick={() => handleSort("startDateAscending")}
          >
            ↑
          </button>
        ) : (
          <button
            className="sortButton"
            onClick={() => handleSort("startDateAscending")}
          >
            ↑
          </button>
        )}
        {activeSort === "startDateDescending" ? (
          <button
            className="sortButtonActive"
            onClick={() => handleSort("startDateDescending")}
          >
            ↓
          </button>
        ) : (
          <button
            className="sortButton"
            onClick={() => handleSort("startDateDescending")}
          >
            ↓
          </button>
        )}
        <p>End Date</p>
        {activeSort === "endDateAscending" ? (
          <button
            className="sortButtonActive"
            onClick={() => handleSort("endDateAscending")}
          >
            ↑
          </button>
        ) : (
          <button
            className="sortButton"
            onClick={() => handleSort("endDateAscending")}
          >
            ↑
          </button>
        )}
        {activeSort === "endDateDescending" ? (
          <button
            className="sortButtonActive"
            onClick={() => handleSort("endDateDescending")}
          >
            ↓
          </button>
        ) : (
          <button
            className="sortButton"
            onClick={() => handleSort("endDateDescending")}
          >
            ↓
          </button>
        )}
        <p>Project Size</p>
        {activeSort === "sizeAscending" ? (
          <button
            className="sortButtonActive"
            onClick={() => handleSort("sizeAscending")}
          >
            ↑
          </button>
        ) : (
          <button
            className="sortButton"
            onClick={() => handleSort("sizeAscending")}
          >
            ↑
          </button>
        )}
        {activeSort === "sizeDescending" ? (
          <button
            className="sortButtonActive"
            onClick={() => handleSort("sizeDescending")}
          >
            ↓
          </button>
        ) : (
          <button
            className="sortButton"
            onClick={() => handleSort("sizeDescending")}
          >
            ↓
          </button>
        )}
      </div>
      <section className="projectListContainer">{projectList}</section>
    </div>
  );
}
