/* eslint-disable @typescript-eslint/no-explicit-any */
// import { generateCSVType } from "../utilities";
// import { useState } from "react";
// import DropCSV from "../components/fileUpload/DropCSV";
// import ExplorableTable from "../components/table/ExplorableTable";
import styles from "./Pages.module.scss";
// import ModalCard from "../components/cards/ModalCard";
// import Button from "../components/buttons/button";

function Test() {
  // const [csvData, setCSVData] = useState<any[]>([]);
  // const [typeDefinition, setTypeDefinition] = useState<string>("");

  // const handleCSVUpload = (data: any[]) => {
  //   // Handle the parsed CSV data here
  //   setCSVData(data);

  //   // Generate the type definition dynamically
  //   const dynamicTypeDefinition = generateCSVType(data);
  //   setTypeDefinition(dynamicTypeDefinition);
  //   console.log("Type Definition:", dynamicTypeDefinition);
  // };

  // Logic for rendering individual project details goes here
  return (
    <div className={styles.page}>
      {/* <ModalCard
        title="Success"
        description="Your payment has been successfully processed. We have emailed your receipt."
        buttons={[
          <Button key="ok">OK</Button>,
          <Button key="cancel">Cancel</Button>,
        ]}
      /> */}
      {/* 
      <DropCSV onCSVUpload={handleCSVUpload} />
      {csvData.length > 0 && (
        <ExplorableTable csvData={csvData} typeDefinition={typeDefinition} />
      )} */}
    </div>
  );
}

export default Test;
