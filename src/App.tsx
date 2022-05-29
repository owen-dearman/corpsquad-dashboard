import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { MainDashboard } from "./components/MainDashboard";
import { projectInterface } from "./utils/interfaces";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App(): JSX.Element {
  const [projectData, setProjectData] = useState<projectInterface[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      const projects = await axios.get(
        "https://consulting-projects.academy-faculty.repl.co/api/projects"
      );
      setProjectData(projects.data);
      console.log(projects);
    }
    fetchProjects();
  }, []);

  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<MainDashboard data={projectData} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
