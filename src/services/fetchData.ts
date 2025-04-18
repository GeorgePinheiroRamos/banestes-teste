import Papa, { ParseError } from "papaparse";

const BASE_URL =
  "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=";

export async function fetchCSV<T = any>(sheet: string): Promise<T[]> {
  const url = `${BASE_URL}${sheet}`;
  const res = await fetch(url);
  const csvText = await res.text();

  return new Promise((resolve, reject) => {
    Papa.parse<T>(csvText, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (result) => resolve(result.data),
      error: (error: Error | ParseError) => reject(error),
    });
  });
}
