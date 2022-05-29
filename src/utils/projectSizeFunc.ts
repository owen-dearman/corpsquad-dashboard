import { projectInterface } from "./interfaces";

/**
 *
 * @param projects list of projects
 * @returns number - total revenue made from projects
 */

export function getTotalRevenue(projects: projectInterface[]): number {
  let totalProjectsize = 0;
  for (const project of projects) {
    totalProjectsize += parseFloat(project.contract.size);
  }
  return totalProjectsize;
}

/**
 *
 * @param length number of projects
 * @param size total revenue made from projects
 * @returns number - mean average revenue from a project
 */

export function getAverageRevenue(length: number, size: number): number {
  return size / length;
}
