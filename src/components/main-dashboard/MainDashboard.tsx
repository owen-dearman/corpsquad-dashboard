import { projectInterface } from "../../utils/interfaces";
import { FilterBar } from "./FilterBar";
import { SingleProject } from "./SingleProject";
import { StatisticsOverview } from "./StatisticsOverview";

interface MainDashboardProps {
  data: projectInterface[];
}

export function MainDashboard({ data }: MainDashboardProps): JSX.Element {
  const projectList = data.map((proj) => (
    <SingleProject key={proj.id} data={proj} />
  ));
  return (
    <div>
      <FilterBar />
      <StatisticsOverview projects={data} />
      <h2>Showing {projectList.length} Projects:</h2>
      <section className="projectListContainer">{projectList}</section>
    </div>
  );
}
