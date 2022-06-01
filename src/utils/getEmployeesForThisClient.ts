import { getNameOfEmployee } from "./addClientsAndEmployeesToProjects";
import { fullEmployeeInterface, fullProjectInterface } from "./interfaces";

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

function addEmployee(employeeID: string, employeeStore: string[]) {
  if (employeeStore.includes(employeeID)) {
    return;
  } else {
    employeeStore.push(employeeID);
  }
}
