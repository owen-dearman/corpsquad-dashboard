import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getClientProjects } from "../utils/getClientProjects";
import { getEmployeesForThisClient } from "../utils/getEmployeesForThisClient";
import {
  fullClientInterface,
  fullEmployeeInterface,
  fullProjectInterface,
} from "../utils/interfaces";
import { getAverageRevenue, getTotalRevenue } from "../utils/projectStats";
import { SingleProject } from "./SingleProject";

interface ClientDashboardProps {
  projectData: fullProjectInterface[];
  employeeList: fullEmployeeInterface[];
}

export function ClientDashboard({
  projectData,
  employeeList,
}: ClientDashboardProps): JSX.Element {
  const [clientData, setClientData] = useState<fullClientInterface>();
  const { clientId } = useParams() as { clientId: string };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [clientId]);

  useEffect(() => {
    async function fetchClientData() {
      const response = await axios.get(
        `https://consulting-projects.academy-faculty.repl.co/api/clients/${clientId}`
      );
      setClientData(response.data);
    }
    fetchClientData();
  }, [clientId]);

  const clientProjects = getClientProjects(projectData, clientId);
  const projectList = clientProjects.map((project) => (
    <SingleProject key={project.id} data={project} />
  ));

  const employees = getEmployeesForThisClient(
    clientProjects,
    employeeList
  ).sort((a, b) => a.name.localeCompare(b.name));
  const employeesForClient = employees.map((em) => (
    <p className="employeeTag" key={em.id}>
      <Link className="navLink" to={`/employees/${em.id}`}>
        {em.name}
      </Link>
    </p>
  ));

  const totalRevenue = getTotalRevenue(clientProjects);
  const averageRevenue = getAverageRevenue(projectList.length, totalRevenue);

  return (
    <div>
      <h1 className="clientBio">
        <strong>{clientData?.name}</strong>
      </h1>
      <h1 style={{ textAlign: "center" }}>{clientData?.id}</h1>
      <section className="statisticsBanner">
        <h3>Total Projects: {projectList.length}</h3>
        <h3>Total Project Revenue: £{totalRevenue.toFixed(2)}</h3>
        <h3>Average Project Revenue: £{averageRevenue.toFixed(2)}</h3>
      </section>
      <h2 className="subtitle">Employees: {employees.length}</h2>
      <section className="employeeListContainer">{employeesForClient}</section>
      <h2 className="subtitle">Projects:</h2>
      <section className="projectListContainer">{projectList}</section>
    </div>
  );
}
