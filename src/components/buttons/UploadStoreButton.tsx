import React from "react";
import useStore from "../../store/useStore";
import Button from "../buttons/button";

const UploadStoreButton: React.FC = () => {
  const setStoreData = useStore((state) => ({
    setProjectTitle: state.setProjectTitle,
    setDataTitle: state.setDataTitle,
    setUploadedImage: state.setUploadedImage,
    setImageAltText: state.setImageAltText,
    setItems: state.setItems,
  }));

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = e.target?.result as string;
        const data = JSON.parse(json);
        const { projectTitle, dataTitle, uploadedImage, imageAltText, items } =
          data;

        setStoreData.setProjectTitle(projectTitle || "");
        setStoreData.setDataTitle(dataTitle || "");
        setStoreData.setUploadedImage(uploadedImage || null);
        setStoreData.setImageAltText(imageAltText || "");
        setStoreData.setItems(items || []);
      } catch (error) {
        console.error("Failed to parse JSON", error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <input
        id="upload"
        type="file"
        accept=".json"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <label htmlFor="upload">
        <Button>Upload Store Data</Button>
      </label>
    </div>
  );
};

export default UploadStoreButton;
