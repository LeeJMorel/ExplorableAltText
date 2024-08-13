import React from "react";
import useStore from "../../store/useStore";
import Button from "../buttons/button";

const DownloadStoreButton: React.FC = () => {
  const { projectTitle, dataTitle, uploadedImage, imageAltText, items } =
    useStore((state) => ({
      projectTitle: state.projectTitle,
      dataTitle: state.dataTitle,
      uploadedImage: state.uploadedImage,
      imageAltText: state.imageAltText,
      items: state.items,
    }));

  const handleDownload = () => {
    const storeData = {
      projectTitle,
      dataTitle,
      uploadedImage,
      imageAltText,
      items,
    };

    const blob = new Blob([JSON.stringify(storeData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "storeData.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return <Button onClick={handleDownload}>Download Store Data</Button>;
};

export default DownloadStoreButton;
