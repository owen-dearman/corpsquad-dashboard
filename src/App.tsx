import { useEffect, useReducer } from "react";
import { Header } from "./components/Header";
import { MainDashboard } from "./components/main-dashboard/MainDashboard";
import {
  fullClientInterface,
  fullEmployeeInterface,
  fullProjectInterface,
} from "./utils/interfaces";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { addClientsAndEmployeesToProjects } from "./utils/addClientsAndEmployeesToProjects";
import { EmployeeDashboard } from "./components/EmployeeDashboard";
import { ClientDashboard } from "./components/ClientDashboard";
import { fetchListOfClients } from "./utils/fetchListOfClients";
import { fetchListOfEmployees } from "./utils/fetchListOfEmployees";

export type State = {
  projectData: fullProjectInterface[];
  clientList: fullClientInterface[];
  employeeList: fullEmployeeInterface[];
  isLoading: boolean;
  filters: {
    projectSize: { min: null | string; max: null | string };
    clients: string[];
    employees: string[];
    timeFrame: { start: null | string; end: null | string };
  };
};

export type Action =
  | { type: "request" }
  | {
      type: "success";
      projects: fullProjectInterface[];
      clients: fullClientInterface[];
      employees: fullEmployeeInterface[];
    }
  | { type: "set-filters"; results: State["filters"] };

function App(): JSX.Element {
  const projectDataReducer = (state: State, action: Action): State => {
    switch (action.type) {
      case "request":
        return {
          ...state,
          isLoading: true,
        };
      case "success":
        return {
          ...state,
          isLoading: false,
          projectData: action.projects,
          clientList: action.clients,
          employeeList: action.employees,
        };
      case "set-filters":
        return {
          ...state,
          isLoading: false,
          filters: action.results,
        };
    }
  };

  const [
    { projectData, clientList, employeeList, isLoading, filters },
    dispatch,
  ] = useReducer(projectDataReducer, {
    projectData: [],
    clientList: [],
    employeeList: [],
    filters: {
      projectSize: { min: null, max: null },
      clients: [],
      employees: [],
      timeFrame: { start: null, end: null },
    },
    isLoading: false,
  });

  //const [projectData, setProjectData] = useState<fullProjectInterface[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      dispatch({ type: "request" });
      const projects = await axios.get(
        "https://consulting-projects.academy-faculty.repl.co/api/projects"
      );
      const clients = await fetchListOfClients();
      const employees = await fetchListOfEmployees();
      const fullProjectList = addClientsAndEmployeesToProjects(
        projects.data,
        clients,
        employees
      );
      dispatch({
        type: "success",
        projects: fullProjectList,
        clients: clients,
        employees: employees,
      });
    }
    fetchProjects();
  }, []);

  return (
    <>
      <Router>
        <Header />
        {isLoading ? (
          <h1 className="loadingMessage">Loading...</h1>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <MainDashboard
                  projectData={projectData}
                  clientList={clientList}
                  employeeList={employeeList}
                  dispatch={dispatch}
                  filters={filters}
                />
              }
            />
            <Route
              path="/employees/:employeeId"
              element={<EmployeeDashboard projectData={projectData} />}
            />
            <Route
              path="/clients/:clientId"
              element={<ClientDashboard projectData={projectData} />}
            />
          </Routes>
        )}
      </Router>
    </>
  );
}

export default App;
