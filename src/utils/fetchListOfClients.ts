import axios from "axios";
import { fullClientInterface } from "./interfaces";

/**
 *
 * @returns list of all clients with name and id
 */

export async function fetchListOfClients(): Promise<fullClientInterface[]> {
  const clientList = await axios.get(
    "https://consulting-projects.academy-faculty.repl.co/api/clients"
  );
  return clientList.data;
}
