/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useCSVReader,
  formatFileSize,
  lightenDarkenColor,
} from "react-papaparse";
import classNames from "classnames";
import styles from "./FileUpload.module.scss";
import { generateCSVType } from "../../utilities";

interface IDropCSVProps {
  onCSVUpload: (data: any[], type: string) => void;
}

const DEFAULT_REMOVE_HOVER_COLOR = "#A01919";
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
  DEFAULT_REMOVE_HOVER_COLOR,
  40
);

function DropCSV({ onCSVUpload }: IDropCSVProps) {
  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = useState(false);
  const [removeHoverColor, setRemoveHoverColor] = useState(
    DEFAULT_REMOVE_HOVER_COLOR
  );

  return (
    <CSVReader
      onUploadAccepted={(results: any) => {
        console.log("---------------------------");
        console.log(results);
        console.log("---------------------------");
        setZoneHover(false);
        const csvType = generateCSVType(results.data); // Generate CSV type
        onCSVUpload(results.data, csvType); // Pass CSV data and type to the parent component
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
