/* eslint-disable @typescript-eslint/no-explicit-any */
// components/fileUpload/DropCSV.tsx
import { useState } from "react";
import {
  useCSVReader,
  formatFileSize,
  lightenDarkenColor,
} from "react-papaparse";
import classNames from "classnames";
import styles from "./FileUpload.module.scss";
import useStore from "../../store/useStore";
import { generateCSVType } from "../../utilities/generateCSVType";

const DEFAULT_REMOVE_HOVER_COLOR = "#A01919";
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
  DEFAULT_REMOVE_HOVER_COLOR,
  40
);

function DropCSV() {
  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = useState(false);
  const [removeHoverColor, setRemoveHoverColor] = useState(
    DEFAULT_REMOVE_HOVER_COLOR
  );
  const addCSV = useStore((state) => state.addCSV);
  const removeCSV = useStore((state) => state.removeCSV);

  const handleCSVUpload = (results: any) => {
    setZoneHover(false);
    const csvType = generateCSVType(results.data); // Generate CSV type
    addCSV(results.data, csvType); // Add CSV data and type to store
  };

  const handleRemoveFile = () => {
    // Assuming the component knows which CSV to remove based on context or state
    // For demonstration, we'll assume it's the most recently added CSV
    removeCSV; // Adjust index based on your logic
  };

  return (
    <CSVReader
      onUploadAccepted={(results: any) => {
        handleCSVUpload(results);
      }}
      onDragOver={(event: DragEvent) => {
        event.preventDefault();
        setZoneHover(true);
      }}
      onDragLeave={(event: DragEvent) => {
        event.preventDefault();
        setZoneHover(false);
      }}
    >
      {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
        Remove,
      }: any) => (
        <>
          <div
            {...getRootProps()}
            className={classNames(styles.zone, {
              [styles.zoneHover]: zoneHover,
            })}
          >
            {acceptedFile ? (
              <>
                <div className={styles.file}>
                  <div className={styles.info}>
                    <span className={styles.size}>
                      {formatFileSize(acceptedFile.size)}
                    </span>
                    <span className={styles.name}>{acceptedFile.name}</span>
                  </div>
                  <div className={styles.progressBar}>
                    <ProgressBar />
                  </div>
                  <div
                    {...getRemoveFileProps()}
                    className={styles.remove}
                    onMouseOver={(event: Event) => {
                      event.preventDefault();
                      setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                    }}
                    onMouseOut={(event: Event) => {
                      event.preventDefault();
                      setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                    }}
                    onClick={handleRemoveFile}
                  >
                    <Remove color={removeHoverColor} />
                  </div>
                </div>
              </>
            ) : (
              "Drop CSV file here or click to upload"
            )}
          </div>
        </>
      )}
    </CSVReader>
  );
}

export default DropCSV;
