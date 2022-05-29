import {
  getAverageRevenue,
  getTotalRevenue,
} from "../../utils/projectSizeFunc";
import { projectInterface } from "../../utils/interfaces";

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
      <h1>Statistics:</h1>
      <div>
        <h3>Number Of Projects: {projects.length}</h3>
        <h3>Number Of Clients:</h3>
        <h3>Total Revenue: £{totalRevenue.toFixed(2)}</h3>
        <h3>Average Revenue: £{averageRevenue.toFixed(2)}</h3>
      </div>
    </section>
  );
}
