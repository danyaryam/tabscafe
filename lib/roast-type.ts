export type RoastType =
  | "light"
  | "light_medium"
  | "medium"
  | "medium_dark"
  | "dark";

export const ROAST_OPTIONS: {
  value: RoastType;
  label: string;
}[] = [
  { value: "light", label: "Light" },
  { value: "light_medium", label: "Light Medium" },
  { value: "medium", label: "Medium" },
  { value: "medium_dark", label: "Medium Dark" },
  { value: "dark", label: "Dark" },
];
