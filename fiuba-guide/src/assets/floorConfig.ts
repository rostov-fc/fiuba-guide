import { FloorId } from "../types/FloorId";
import P1config from "./P1.json";

export type FloorConfig = {
  id: string;
  displayName: string;
  searchTerms: string[];
};

export const floorConfig = {
  [FloorId.P1]: P1config,
};
