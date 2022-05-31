import axios from "axios";
import { fullClientInterface } from "./interfaces";

export async function fetchListOfClients(): Promise<fullClientInterface[]> {
  const clientList = await axios.get(
    "https://consulting-projects.academy-faculty.repl.co/api/clients"
  );
  return clientList.data;
}
