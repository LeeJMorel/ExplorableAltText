import { Button } from "@ariakit/react";
import { usePapaParse } from "react-papaparse";

interface JsonDataItem {
  [key: string]: string | number;
}

interface Props {
  jsonData: JsonDataItem[];
}

export default function JsonToCSV({ jsonData }: Props) {
  const { jsonToCSV } = usePapaParse();

  const handleJsonToCSV = () => {
    const csvData = jsonToCSV(jsonData);
    const csvBlob = new Blob([csvData], { type: "text/csv" });
    const csvURL = window.URL.createObjectURL(csvBlob);
    const tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", "data.csv");
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  };

  return <Button onClick={handleJsonToCSV}>Download CSV</Button>;
}
