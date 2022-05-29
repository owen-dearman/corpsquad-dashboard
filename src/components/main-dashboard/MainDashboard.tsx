import { fullProjectInterface } from "../../utils/interfaces";
import { FilterBar } from "./FilterBar";
import { SingleProject } from "./SingleProject";
import { StatisticsOverview } from "./StatisticsOverview";

interface MainDashboardProps {
  data: fullProjectInterface[];
}

export function MainDashboard({ data }: MainDashboardProps): JSX.Element {
  const projectList = data.map((proj) => (
    <SingleProject key={proj.id} data={proj} />
  ));
  return (
    <div>
      <FilterBar />
      <StatisticsOverview projects={data} />
      <h2 style={{ textAlign: "center" }}>
        Showing {projectList.length} Projects:
      </h2>
      <section className="projectListContainer">{projectList}</section>
    </div>
  );
}
