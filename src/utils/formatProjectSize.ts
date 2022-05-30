/**
 *
 * @param size size of project
 * @returns size of project with formatted '£' and commas
 */

export function formatProjectSize(size: string): string {
  const projectSize = parseFloat(size);
  return `£${projectSize.toLocaleString()}`;
}
