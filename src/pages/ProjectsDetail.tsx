/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import styles from "./Pages.module.scss";

function ProjectsDetail() {
  const { projectId } = useParams();

  // Logic for rendering individual project details goes here
  return (
    <div className={styles.projectsDetail}>
      <h2>Project Detail for ID: {projectId}</h2>
    </div>
  );
}

export default ProjectsDetail;
