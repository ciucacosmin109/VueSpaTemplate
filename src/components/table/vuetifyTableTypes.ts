export type SelectItemKey =
  | boolean
  | string
  | (string | number)[]
  | ((item: Record<string, any>, fallback?: any) => any);

export type DataTableCompareFunction<T = any> = (a: T, b: T) => number;

export type DataTableHeader = {
  key: string;
  value?: SelectItemKey;
  title: string;
  colspan?: number;
  rowspan?: number;
  fixed?: boolean;
  align?: "start" | "end";
  width?: number;
  minWidth?: string;
  maxWidth?: string;
  sortable?: boolean;
  sort?: DataTableCompareFunction;
};

export type SortItem = {
  key: string;
  order?: boolean | "asc" | "desc";
};
