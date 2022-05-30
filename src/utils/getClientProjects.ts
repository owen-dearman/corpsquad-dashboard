import { fullProjectInterface } from "./interfaces";

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

function idMatch(id1: string, id2: string) {
  return id1 === id2;
}
