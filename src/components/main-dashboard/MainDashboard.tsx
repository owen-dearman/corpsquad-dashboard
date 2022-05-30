import { fullProjectInterface } from "../../utils/interfaces";
import { FilterBar } from "./FilterBar";
import { SingleProject } from "../SingleProject";
import { StatisticsOverview } from "./StatisticsOverview";
import { useEffect } from "react";

interface MainDashboardProps {
  projectData: fullProjectInterface[];
}

export function MainDashboard({
  projectData,
}: MainDashboardProps): JSX.Element {
  const projectList = projectData.map((proj) => (
    <SingleProject key={proj.id} data={proj} />
  ));
  return (
    <div>
      <FilterBar />
      <StatisticsOverview projects={projectData} />
      <h2 style={{ textAlign: "center" }}>
        Showing {projectList.length} Projects:
      </h2>
      <section className="projectListContainer">{projectList}</section>
    </div>
  );
}
