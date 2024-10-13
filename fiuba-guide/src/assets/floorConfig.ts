import { FloorId } from "../types/FloorId";
import P1config from "./P1.json";
import P2config from "./P2.json";
import P3config from "./P3.json";
import P4config from "./P4.json";

export type FloorConfig = {
  id: string;
  displayName: string;
  searchTerms: string[];
};

export const floorConfig = {
  [FloorId.P1]: P1config,
  [FloorId.P2]: P2config,
  [FloorId.P3]: P3config,
  [FloorId.P4]: P4config,
};
