import { fetchListOfClients } from "./fetchListOfClients";
import { fetchListOfEmployees } from "./fetchListOfEmployees";
import {
  fullClientInterface,
  fullEmployeeInterface,
  fullProjectInterface,
  projectInterface,
} from "./interfaces";

/**
 *
 * @param projects list of projects minus client and employee names
 * @returns list of projects with client and employee names included
 */

export async function addClientsAndEmployeesToProjects(
  projects: projectInterface[]
): Promise<fullProjectInterface[]> {
  const clientList = await fetchListOfClients();
  const employeeList = await fetchListOfEmployees();
  const fullProjectDetails: fullProjectInterface[] = [];
  for (const project of projects) {
    let clientName: fullClientInterface | undefined = clientList.find(
      (client: fullClientInterface) => project.clientId === client.id
    );
    if (!clientName) {
      clientName = { id: project.clientId, name: "No Client In Register" };
    }
    const employeeIdsAndNames = matchEmployeeNamesToIds(
      project.employeeIds,
      employeeList
    );
    const expandedProjectDetails: fullProjectInterface = {
      id: project.id,
      client: clientName,
      contract: project.contract,
      employees: employeeIdsAndNames,
    };
    fullProjectDetails.push(expandedProjectDetails);
  }
  return fullProjectDetails;
}

/**
 *
 * @param employeeIds array of employee IDs from the project
 * @param employeeList array of all employees containing name and ID
 * @returns array of employee names and IDs from the project
 */

function matchEmployeeNamesToIds(
  employeeIds: string[],
  employeeList: fullEmployeeInterface[]
): fullEmployeeInterface[] {
  const employeeIdsAndNames: fullEmployeeInterface[] = [];
  for (const id of employeeIds) {
    const name = getNameOfEmployee(id, employeeList);
    employeeIdsAndNames.push({ id: id, name: name });
  }
  return employeeIdsAndNames;
}

/**
 *
 * @param id ID of employee
 * @param employeeList list of employee names and IDs
 * @returns name matching ID or "name not in employee list"
 */

function getNameOfEmployee(
  id: string,
  employeeList: fullEmployeeInterface[]
): string {
  for (const employee of employeeList) {
    if (employee.id === id) {
      return employee.name;
    }
  }
  return "Name not in employee list";
}
