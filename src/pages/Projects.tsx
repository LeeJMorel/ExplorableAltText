import { Outlet } from "react-router-dom";

function Projects() {
  return (
    <div>
      <h1>Projects</h1>
      <p>Explorable Alt Text</p>
      {/* Outlet to render child routes */}
      <Outlet />
    </div>
  );
}

export default Projects;
