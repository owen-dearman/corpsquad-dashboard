import { projectInterface } from "../utils/projectInterface";
import { StatisticsOverview } from "./StatisticsOverview";

interface MainDashboardProps {
  data: projectInterface[];
}

export function MainDashboard({ data }: MainDashboardProps): JSX.Element {
  return (
    <div>
      <StatisticsOverview projects={data} />
    </div>
  );
}
