import { idMatch } from "./getClientProjects";
import { fullProjectInterface } from "./interfaces";

/**
 *
 * @param projectList list of projects
 * @param id employee ID
 * @returns list of projects that employee worked on
 */

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
