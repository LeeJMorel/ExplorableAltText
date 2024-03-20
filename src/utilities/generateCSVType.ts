import { CSVRow } from "./types";

export function generateCSVType(csvData: CSVRow[]): string {
  const allKeys = csvData.reduce((keys, row) => {
    return [...keys, ...Object.keys(row)];
  }, [] as string[]);

  const uniqueKeys = Array.from(new Set(allKeys));

  const typeProperties = uniqueKeys.map((key) => `${key}: string | undefined;`);

  return `type CSVDataType = {
      ${typeProperties.join("\n      ")}
    }`;
}
