import axios from "axios";
import { useState, useEffect } from "react";
import {
  employeeDataInterface,
  fullProjectInterface,
} from "../utils/interfaces";
import { useParams } from "react-router-dom";
import { SingleProject } from "./SingleProject";
import { getEmployeeProjects } from "../utils/getEmployeeProjects";
import { getAverageRevenue, getTotalRevenue } from "../utils/projectStats";

interface EmployeeDashboardProps {
  projectData: fullProjectInterface[];
}

export function EmployeeDashboard({
  projectData,
}: EmployeeDashboardProps): JSX.Element {
  const [employeeData, setEmployeeData] = useState<employeeDataInterface>();
  const { employeeId } = useParams() as { employeeId: string };

  useEffect(() => {
    async function fetchEmployeeData() {
      const response = await axios.get(
        `https://consulting-projects.academy-faculty.repl.co/api/employees/${employeeId}`
      );
      setEmployeeData(response.data);
    }
    fetchEmployeeData();
  });

  const employeeProjects = getEmployeeProjects(projectData, employeeId);
  const projectList = employeeProjects.map((project) => (
    <SingleProject key={project.id} data={project} />
  ));

  const totalRevenue = getTotalRevenue(employeeProjects);
  const averageRevenue = getAverageRevenue(projectList.length, totalRevenue);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{employeeData?.id}</h1>
      <section className="employeeBio">
        {employeeData?.avatar && (
          <img
            className="employeeAvatar"
            alt="portrait of employee"
            src={employeeData?.avatar}
          />
        )}
        <div className="employeeDetails">
          <h1 style={{ fontSize: "40px" }}>
            <strong>{employeeData?.name}</strong>
          </h1>
          <h2>
            <em>{employeeData?.role}</em>
          </h2>
        </div>
      </section>
      <section className="statisticsBanner">
        <h3>Total Projects: {projectList.length}</h3>
        <h3>Total Project Revenue: £{totalRevenue.toFixed(2)}</h3>
        <h3>Average Project Revenue: £{averageRevenue.toFixed(2)}</h3>
      </section>
      <section className="projectListContainer">{projectList}</section>
    </div>
  );
}
