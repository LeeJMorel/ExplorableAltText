/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import styles from "./HTMLAccess.module.scss";
import useStore from "../../store/useStore";

interface DownloadButtonProps {
  title: string;
  dataTitle: string;
  imageSrc: string | null;
  imageAltText: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  title,
  dataTitle,
  imageSrc,
  imageAltText = "Uploaded Project", // Default alt text
}) => {
  const { items: draggableData } = useStore();

  // Function to generate HTML content
  const generateHTML = () => {
    let htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .pageTitle { font-size: 2em; margin-bottom: 0.5em; }
          .dataTitle { font-size: 1.5em; margin-bottom: 1em; }
          .draggableContainer { margin-bottom: 1em; }
          .uploadedImage { max-width: 100%; height: auto; margin-bottom: 1em; }
        </style>
      </head>
      <body>
        <h1 class="pageTitle">${title}</h1>
        <h2 class="dataTitle">${dataTitle}</h2>
        <div class="draggableContainer">
    `;

    draggableData.forEach((item: any) => {
      htmlContent += `
        <div>
          <h3>${item.title}</h3>
          <div>${item.content}</div>
        </div>
      `;
    });

    if (imageSrc) {
      htmlContent += `
        <img src="${imageSrc}" alt="${imageAltText}" class="uploadedImage" />
      `;
    }

    htmlContent += `
        </div>
      </body>
      </html>
    `;

    return htmlContent;
  };

  // Function to handle download
  const handleDownload = () => {
    const htmlContent = generateHTML();
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "renderedPage.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button className={styles.actionButton} onClick={handleDownload}>
      Download HTML
    </button>
  );
};

export default DownloadButton;
