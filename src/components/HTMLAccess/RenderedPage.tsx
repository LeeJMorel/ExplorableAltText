/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import styles from "./HTMLAccess.module.scss";
import useStore from "../../store/useStore";

interface RenderedPageProps {
  title: string;
  dataTitle: string;
  imageSrc: string | null;
  imageAltText: string;
}

const RenderedPage: React.FC<RenderedPageProps> = ({
  title,
  dataTitle,
  imageSrc,
  imageAltText = "Uploaded Project", // Default alt text
}) => {
  const { items: draggableData } = useStore();

  return (
    <div className={styles.renderedPage}>
      <h1 className={styles.pageTitle}>{title}</h1>
      <h2 className={styles.dataTitle}>{dataTitle}</h2>
      <div className={styles.draggableContainer}>
        {draggableData.map(
          (item: {
            id: React.Key | null | undefined;
            title:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined;
            content:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined;
          }) => (
            <div key={item.id} className={styles.draggableItem}>
              <h3>{item.title}</h3>
              <div>{item.content}</div>
            </div>
          )
        )}
      </div>
      {imageSrc && (
        <img
          src={imageSrc}
          alt={imageAltText}
          className={styles.uploadedImage}
        />
      )}
    </div>
  );
};

export default RenderedPage;
