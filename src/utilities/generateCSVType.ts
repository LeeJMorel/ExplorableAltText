import { CSVRow } from "./types";

export function generateCSVType(csvData: CSVRow[]): string {
  if (csvData.length === 0) {
    return "type CSVDataRow = {}";
  }

  const rowTypeDefinition = csvData.reduce((typeDefinition, row, rowIndex) => {
    // Generate type properties for the row
    const rowTypeProperties = Object.keys(row).map((key) => {
      const value = row[key];
      const type = typeof value;
      return `${key}: ${type}`;
    });

    // Combine type properties into a type definition for the row
    const rowTypeDef = `type CSVDataRow${
      rowIndex + 1
    } = { ${rowTypeProperties.join("; ")} }`;

    return `${typeDefinition}\n${rowTypeDef}`;
  }, "");

  return rowTypeDefinition;
}
