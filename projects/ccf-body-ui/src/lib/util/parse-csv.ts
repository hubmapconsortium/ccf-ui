import { parse } from 'papaparse';

export async function parseCSVText(csvText: string, firstFieldName?: string): Promise<{ [key: string]: string }[]> {
  const csvRows = parse(csvText, { skipEmptyLines: true }).data as string[][];
  let headerIndex = 0;
  let csvHeader = csvRows[0];
  if (firstFieldName) {
    csvHeader = csvRows.find((row, index) => {
      if (row[0] === firstFieldName) {
        headerIndex = index;
      }
      return row[0] === firstFieldName;
    }) ?? [];
  }
  if (csvHeader.length > 0) {
    return csvRows.slice(headerIndex + 1).map((row) => row.reduce((acc, value, index) => {
      if (index < csvHeader.length) {
        // Empty cells with just a dash in it.
        value = value.trim() === '-' ? '' : value;
        acc[csvHeader[index]] = value;
      }
      return acc;
    }, {}));
  } else {
    return [];
  }
}

export async function parseCSV(sourceUrl: string, firstFieldName?: string): Promise<{ [key: string]: string }[]> {
  const csvText = await fetch(sourceUrl).then(r => r.text());
  return parseCSVText(csvText, firstFieldName);
}
