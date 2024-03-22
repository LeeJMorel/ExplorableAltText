import { Outlet } from "react-router-dom";
import styles from "./Pages.module.scss";

function Projects() {
  return (
    <div className={styles.page}>
      <h1>Projects</h1>
      <p>Explorable Alt Text</p>
      {/* Outlet to render child routes */}
      <Outlet />
    </div>
  );
}

export default Projects;
