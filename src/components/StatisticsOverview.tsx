import { getAverageRevenue, getTotalRevenue } from "../utils/projectSizeFunc";
import { projectInterface } from "../utils/projectInterface";

interface StatisticsOverviewProps {
  projects: projectInterface[];
}

export function StatisticsOverview({
  projects,
}: StatisticsOverviewProps): JSX.Element {
  const totalRevenue = getTotalRevenue(projects);
  const averageRevenue = getAverageRevenue(projects.length, totalRevenue);

  return (
    <section>
      <h2>Number Of Projects: {projects.length}</h2>
      <h2>Number Of Clients:</h2>
      <h2>Total Revenue: £{totalRevenue}</h2>
      <h2>Average Revenue: £{averageRevenue}</h2>
    </section>
  );
}
