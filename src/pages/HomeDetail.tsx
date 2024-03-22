/* eslint-disable @typescript-eslint/no-explicit-any */
import { generateCSVType } from "../utilities";
import { useState } from "react";
import DropCSV from "../components/fileUpload/DropCSV";
import ExplorableTable from "../components/table/ExplorableTable";
import { useParams } from "react-router-dom";
import styles from "./Pages.module.scss";

function HomeDetail() {
  const { projectId } = useParams();
  const [csvData, setCSVData] = useState<any[]>([]);
  const [typeDefinition, setTypeDefinition] = useState<string>("");

  const handleCSVUpload = (data: any[]) => {
    // Handle the parsed CSV data here
    setCSVData(data);

    // Generate the type definition dynamically
    const dynamicTypeDefinition = generateCSVType(data);
    setTypeDefinition(dynamicTypeDefinition);
  };

  // Logic for rendering individual project details goes here
  return (
    <div className={styles.projectsDetail}>
      <h2>Project Detail for ID: {projectId}</h2>
      <DropCSV onCSVUpload={handleCSVUpload} />
      {csvData.length > 0 && (
        <ExplorableTable csvData={csvData} typeDefinition={typeDefinition} />
      )}
    </div>
  );
}

export default HomeDetail;
