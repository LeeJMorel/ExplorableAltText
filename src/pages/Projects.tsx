import DropCSV from "../components/fileUpload/DropCSV";
import ExplorableTable from "../components/table/ExplorableTable";

function Projects() {
  return (
    <div>
      <h1>Projects Page</h1>
      <p>Explore our exciting projects here!</p>
      <DropCSV />
      <ExplorableTable />
    </div>
  );
}

export default Projects;
