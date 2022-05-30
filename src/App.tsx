import { useEffect, useReducer } from "react";
import { Header } from "./components/Header";
import { MainDashboard } from "./components/main-dashboard/MainDashboard";
import { fullProjectInterface } from "./utils/interfaces";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { addClientsAndEmployeesToProjects } from "./utils/addClientsAndEmployeesToProjects";
import { EmployeeDashboard } from "./components/EmployeeDashboard";
import { ClientDashboard } from "./components/ClientDashboard";
import { applyFilters } from "./utils/applyFilters";

export type State = {
  projectData: fullProjectInterface[];
  isLoading: boolean;
  filters?: {
    projectSize: { min: null | string; max: null | string };
    clients: string[];
    employees: string[];
    timeFrame: { start: null | string; end: null | string };
  };
};

type Action =
  | { type: "request" }
  | { type: "success"; results: fullProjectInterface[] }
  | { type: "apply-filters" }
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
          projectData: action.results,
        };
      case "set-filters":
        return {
          ...state,
          isLoading: false,
          filters: action.results,
        };
      case "apply-filters":
        return {
          ...state,
          isLoading: false,
          projectData: applyFilters(state),
        };
    }
  };

  const [{ projectData, isLoading }, dispatch] = useReducer(
    projectDataReducer,
    {
      projectData: [],
      isLoading: false,
    }
  );

  //const [projectData, setProjectData] = useState<fullProjectInterface[]>([]);

  useEffect(() => {
    function fetchProjects() {
      dispatch({ type: "request" });
      axios
        .get("https://consulting-projects.academy-faculty.repl.co/api/projects")
        .then((results) => addClientsAndEmployeesToProjects(results.data))
        .then((projectData) => {
          dispatch({ type: "success", results: projectData });
          dispatch({ type: "apply-filters" });
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
              element={<MainDashboard projectData={projectData} />}
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
