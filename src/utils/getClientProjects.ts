import { fullProjectInterface } from "./interfaces";

/**
 *
 * @param projectList list of projects
 * @param id client ID
 * @returns projects with client ID matching id
 */

export function getClientProjects(
  projectList: fullProjectInterface[],
  id: string
): fullProjectInterface[] {
  return projectList.filter((project) => {
    if (idMatch(id, project.client.id)) {
      return true;
    }
    return false;
  });
}

/**
 *
 * @param id1 first ID
 * @param id2 second ID
 * @returns boolean on match
 */

export function idMatch(id1: string, id2: string): boolean {
  return id1 === id2;
}
