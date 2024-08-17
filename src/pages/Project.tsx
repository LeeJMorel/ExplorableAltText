import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import DropCSV from "../components/fileUpload/DropCSV";
import ExplorableTable from "../components/table/ExplorableTable";
import styles from "./Pages.module.scss";
import DraggableContainer from "../components/draggable/DraggableContainer";
import DownloadButton from "../components/HTMLAccess/DownloadButton";
import useStore from "../store/useStore";
//import DownloadStoreButton from "../components/buttons/DownloadStoreButton";
//import UploadStoreButton from "../components/buttons/UploadStoreButton";

function Project() {
  const {
    projectTitle,
    setProjectTitle,
    dataTitle,
    setDataTitle,
    uploadedImage,
    setUploadedImage,
    imageAltText,
    setImageAltText,
    hasCSV,
  } = useStore((state) => ({
    projectTitle: state.projectTitle,
    setProjectTitle: state.setProjectTitle,
    dataTitle: state.dataTitle,
    setDataTitle: state.setDataTitle,
    uploadedImage: state.uploadedImage,
    setUploadedImage: state.setUploadedImage,
    imageAltText: state.imageAltText,
    setImageAltText: state.setImageAltText,
    hasCSV: state.hasCSV,
  }));

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectTitle(event.target.value);
  };

  const handleDataTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDataTitle(event.target.value);
  };

  const onDrop = (acceptedFiles: File[]) => {
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

  useEffect(() => {
    // Example: reset project title when CSV is removed
    if (!hasCSV) {
      setProjectTitle("");
    }
  }, [hasCSV, setProjectTitle]);

  return (
    <div className={styles.projectPage}>
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
          {hasCSV && (
            <input
              id="dataTitle"
              type="text"
              value={dataTitle}
              onChange={handleDataTitleChange}
              className={styles.dataInput}
              aria-labelledby="dataTitleLabel"
              placeholder="Enter your data title here"
            />
          )}
          <div className={styles.dropCSV}>
            <DropCSV />
          </div>
        </div>
        {hasCSV && <ExplorableTable />}
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
        {/* <h1>Manage Store Data</h1>
        <DownloadStoreButton />
        <UploadStoreButton /> */}
      </div>
      <div className={styles.rightSide}>
        <DownloadButton />
        <h1 className={styles.renderedTitle}>{projectTitle}</h1>
        <h1 className={styles.renderedTitle}>{dataTitle}</h1>
        <div className={styles.draggableContainer}>
          <DraggableContainer />
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

export default Project;
