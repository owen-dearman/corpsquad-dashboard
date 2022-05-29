import { getTotalRevenue } from "../utils/getTotalRevue";
import { projectInterface } from "../utils/projectInterface";

interface StatisticsOverviewProps {
  projects: projectInterface[];
}

export function StatisticsOverview({
  projects,
}: StatisticsOverviewProps): JSX.Element {
  const totalRevenue = getTotalRevenue(projects);

  return (
    <section>
      <h2>Number Of Projects: {projects.length}</h2>
      <h2>Number Of Clients:</h2>
      <h2>Total Revenue: {totalRevenue}</h2>
      <h2>Average Revenue:</h2>
    </section>
  );
}
