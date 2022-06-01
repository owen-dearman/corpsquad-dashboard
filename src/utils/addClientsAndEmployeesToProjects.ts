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

export function addClientsAndEmployeesToProjects(
  projects: projectInterface[],
  clientDatabase: fullClientInterface[],
  employeeDatabase: fullEmployeeInterface[]
): fullProjectInterface[] {
  const fullProjectDetails: fullProjectInterface[] = [];
  for (const project of projects) {
    const clientName = matchClientNameToId(project.clientId, clientDatabase);
    const employeeIdsAndNames = matchEmployeeNamesToIds(
      project.employeeIds,
      employeeDatabase
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
 * @param clientId string ID of client from project
 * @param clientDatabase database of client IDs and names
 * @returns object containing ID from project and matching name or default
 */

export function matchClientNameToId(
  clientId: string,
  clientDatabase: fullClientInterface[]
): fullClientInterface {
  let clientName: fullClientInterface | undefined = clientDatabase.find(
    (client: fullClientInterface) => clientId === client.id
  );
  if (!clientName) {
    clientName = { id: clientId, name: "No Client In Register" };
  }
  return clientName;
}

/**
 *
 * @param employeeIds array of employee IDs from the project
 * @param employeeList array of all employees containing name and ID
 * @returns array of employee names and IDs from the project
 */

export function matchEmployeeNamesToIds(
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

export function getNameOfEmployee(
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
