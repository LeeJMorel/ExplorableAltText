import React from "react";
import styles from "./HTMLAccess.module.scss";
import useStore from "../../store/useStore";

const RenderedPage: React.FC = () => {
  // Get the state from the store
  const {
    projectTitle,
    dataTitle,
    uploadedImage,
    imageAltText,
    items: draggableData,
  } = useStore((state) => ({
    projectTitle: state.projectTitle,
    dataTitle: state.dataTitle,
    uploadedImage: state.uploadedImage,
    imageAltText: state.imageAltText,
    items: state.items,
  }));

  return (
    <div className={styles.renderedPage}>
      <h1 className={styles.pageTitle}>{projectTitle}</h1>
      <h2 className={styles.dataTitle}>{dataTitle}</h2>

      <div className={styles.draggableContainer}>
        {draggableData.length > 0 ? (
          <table className={styles.draggableTable}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Content</th>
              </tr>
            </thead>
            <tbody>
              {draggableData.map((item) => (
                <React.Fragment key={item.id}>
                  <tr>
                    <td>{item.title}</td>
                    <td>{item.content}</td>
                  </tr>
                  {item.children && item.children.length > 0 && (
                    <tr>
                      <td colSpan={2}>
                        <table className={styles.childTable}>
                          <tbody>
                            {item.children.map((child) => (
                              <tr key={child.id}>
                                <td>{child.title}</td>
                                <td>{child.content}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No draggable items available.</p>
        )}
      </div>

      {uploadedImage && (
        <img
          src={uploadedImage}
          alt={imageAltText || "Uploaded Project"}
          className={styles.uploadedImage}
        />
      )}
    </div>
  );
};

export default RenderedPage;
