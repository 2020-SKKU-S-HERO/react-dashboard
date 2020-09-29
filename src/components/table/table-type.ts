export type TableData = {
  headers?: HeaderData[];
  dataset: string[][];
};

export type HeaderData = {
  name: string;
  width?: number;
}