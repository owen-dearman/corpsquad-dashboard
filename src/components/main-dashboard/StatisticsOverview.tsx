import { getAverageRevenue, getTotalRevenue } from "../../utils/projectStats";
import {
  fullClientInterface,
  fullEmployeeInterface,
  fullProjectInterface,
} from "../../utils/interfaces";
import { formatProjectSize } from "../../utils/formatProjectSize";

interface StatisticsOverviewProps {
  projects: fullProjectInterface[];
  clients: fullClientInterface[];
  employees: fullEmployeeInterface[];
}

export function StatisticsOverview({
  projects,
  clients,
  employees,
}: StatisticsOverviewProps): JSX.Element {
  const totalRevenue = getTotalRevenue(projects);
  const averageRevenue = getAverageRevenue(projects.length, totalRevenue);

  return (
    <section className="statisticsBanner">
      <h3>Total Project Count: {projects.length}</h3>
      <h3>Total Client Count: {clients.length}</h3>
      <h3>Total Employee Count: {employees.length}</h3>
      <h3>
        Total Project Revenue: {formatProjectSize(totalRevenue.toFixed(2))}
      </h3>
      <h3>
        Average Project Revenue: {formatProjectSize(averageRevenue.toFixed(2))}
      </h3>
    </section>
  );
}
