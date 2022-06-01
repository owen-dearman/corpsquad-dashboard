import { getNameOfEmployee } from "./addClientsAndEmployeesToProjects";
import { fullEmployeeInterface, fullProjectInterface } from "./interfaces";

/**
 *
 * @param clientProjects list of client projects
 * @param employeeList database of employees
 * @returns array of employees that worked on client projects
 */

export function getEmployeesForThisClient(
  clientProjects: fullProjectInterface[],
  employeeList: fullEmployeeInterface[]
): fullEmployeeInterface[] {
  const employeesIdForClient: string[] = [];
  for (const project of clientProjects) {
    project.employees.forEach((projectEmployee) =>
      addEmployee(projectEmployee.id, employeesIdForClient)
    );
  }
  const clientEmployees: fullEmployeeInterface[] = [];
  for (const employeeID of employeesIdForClient) {
    const employee = {
      id: employeeID,
      name: getNameOfEmployee(employeeID, employeeList),
    };
    clientEmployees.push(employee);
  }
  return clientEmployees;
}

/**
 *
 * @param employeeID employee ID from project
 * @param employeeStore array of stored employee IDS
 * @returns pushes ID to store if not already in there
 */

function addEmployee(employeeID: string, employeeStore: string[]) {
  if (employeeStore.includes(employeeID)) {
    return;
  } else {
    employeeStore.push(employeeID);
  }
}
