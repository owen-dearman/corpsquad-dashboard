import { fullProjectInterface } from "./interfaces";

export function getEmployeeProjects(
  projectList: fullProjectInterface[],
  id: string
): fullProjectInterface[] {
  return projectList.filter((project) => {
    for (const projectEmployee of project.employees) {
      if (idMatch(id, projectEmployee.id)) {
        return true;
      }
    }
    return false;
  });
}

function idMatch(id1: string, id2: string) {
  return id1 === id2;
}
