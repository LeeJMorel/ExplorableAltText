/* eslint-disable @typescript-eslint/no-explicit-any */
import { generateCSVType } from "../utilities";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import DropCSV from "../components/fileUpload/DropCSV";
import ExplorableTable from "../components/table/ExplorableTable";
import styles from "./Pages.module.scss";
import DraggableContainer from "../components/draggable/DraggableContainer";
import { DraggableItem } from "../components/draggable/Bar";

// import ModalCard from "../components/cards/ModalCard";
// import Button from "../components/buttons/button";

function Test(this: any) {
  const initialData: DraggableItem[] = [
    {
      id: "1",
      title: "Item 1",
      content: <div>Content for Item 1</div>,
      children: [
        {
          id: "1-1",
          title: "Item 1-1",
          content: <div>Content for Item 1-1</div>,
        },
      ],
    },
    {
      id: "2",
      title: "Item 2",
      content: <div>Content for Item 2</div>,
    },
  ];

  const [csvData, setCSVData] = useState<any[]>([]);
  const [typeDefinition, setTypeDefinition] = useState<string>("");
  const [projectTitle, setProjectTitle] = useState<string>("");
  const [dataTitle, setDataTitle] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageAltText, setImageAltText] = useState<string>("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectTitle(event.target.value);
  };

  const handleDataTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDataTitle(event.target.value);
  };

  const handleCSVUpload = (data: any[]) => {
    // Handle the parsed CSV data here
    setCSVData(data);

    // Generate the type definition dynamically
    const dynamicTypeDefinition = generateCSVType(data);
    setTypeDefinition(dynamicTypeDefinition);
    console.log("Type Definition:", dynamicTypeDefinition);
  };

  const onDrop = (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const handleAltTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageAltText(event.target.value);
  };

  return (
    <div className={styles.projectPage}>
      {/* <ModalCard
        title="Success"
        description="Your payment has been successfully processed. We have emailed your receipt."
        buttons={[
          <Button key="ok">OK</Button>,
          <Button key="cancel">Cancel</Button>,
        ]}
      />  */}

      <div className={styles.leftSide}>
        <input
          id="projectTitle"
          type="text"
          value={projectTitle}
          onChange={handleTitleChange}
          className={styles.titleInput}
          aria-labelledby="projectTitleLabel"
          placeholder="Enter your project title here"
        />
        <div className={styles.csvContainer}>
          {csvData.length > 0 && (
            <input
              id="dataTitle"
              type="text"
              value={dataTitle}
              onChange={handleDataTitleChange}
              className={styles.dataInput}
              aria-labelledby="projectTitleLabel"
              placeholder="Enter your data title here"
            />
          )}
          <div className={styles.dropCSV}>
            <DropCSV onCSVUpload={handleCSVUpload} />
          </div>
        </div>
        {csvData.length > 0 && (
          <ExplorableTable csvData={csvData} typeDefinition={typeDefinition} />
        )}

        <div {...getRootProps()} className={styles.dropzone}>
          <input {...getInputProps()} />
          <p>
            (Optional) Drag & drop an image of the data graphic here, or click
            to select one
          </p>
        </div>
        <input
          id="imageAltText"
          type="text"
          value={imageAltText}
          onChange={handleAltTextChange}
          className={styles.altTextInput}
          placeholder="Enter alt text for the image"
        />
      </div>
      <div className={styles.rightSide}>
        <h1 className={styles.renderedTitle}>{projectTitle}</h1>
        <h1 className={styles.renderedTitle}>{dataTitle}</h1>
        <div className={styles.draggableContainer}>
          <DraggableContainer initialData={initialData} />
        </div>
        {uploadedImage && (
          <img
            src={uploadedImage}
            alt={imageAltText || "Uploaded Project"}
            className={styles.uploadedImage}
          />
        )}
      </div>
    </div>
  );
}

export default Test;
