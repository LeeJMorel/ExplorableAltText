import { useParams } from "react-router-dom";
import DropCSV from "../components/fileUpload/DropCSV";
import ExplorableTable from "../components/table/ExplorableTable";
import styles from "./Pages.module.scss";

function ProjectsDetail() {
  const { projectId } = useParams();

  // Logic for rendering individual project details goes here
  return (
    <div className={styles.projectsDetail}>
      <h2>Project Detail for ID: {projectId}</h2>
      <DropCSV />
      <ExplorableTable />
    </div>
  );
}

export default ProjectsDetail;
