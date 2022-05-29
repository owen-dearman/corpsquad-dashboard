import { getAverageRevenue, getTotalRevenue } from "../../utils/projectStats";
import { fullProjectInterface } from "../../utils/interfaces";

interface StatisticsOverviewProps {
  projects: fullProjectInterface[];
}

export function StatisticsOverview({
  projects,
}: StatisticsOverviewProps): JSX.Element {
  const totalRevenue = getTotalRevenue(projects);
  const averageRevenue = getAverageRevenue(projects.length, totalRevenue);

  return (
    <section className="statisticsBanner">
      <h3>Total Projects: {projects.length}</h3>
      <h3>Total Revenue: £{totalRevenue.toFixed(2)}</h3>
      <h3>Average Revenue: £{averageRevenue.toFixed(2)}</h3>
    </section>
  );
}
