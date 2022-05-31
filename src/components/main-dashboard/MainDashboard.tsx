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

interface MainDashboardProps {
  projectData: fullProjectInterface[];
  clientList: fullClientInterface[];
  employeeList: fullEmployeeInterface[];
  dispatch: React.Dispatch<Action>;
  filters: State["filters"];
}

export function MainDashboard({
  projectData,
  clientList,
  employeeList,
  dispatch,
  filters,
}: MainDashboardProps): JSX.Element {
  const filteredList = applyFilters(projectData, filters);
  const projectList = filteredList.map((proj) => (
    <SingleProject key={proj.id} data={proj} />
  ));

  return (
    <div>
      <FilterBar
        clientList={clientList}
        employeeList={employeeList}
        dispatch={dispatch}
        filters={filters}
      />
      <StatisticsOverview projects={projectData} />
      <h2 style={{ textAlign: "center" }}>
        Showing {projectList.length} Projects:
      </h2>
      <section className="projectListContainer">{projectList}</section>
    </div>
  );
}
