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

const compareIds = (a: { id: string }, b: { id: string }) => a.id.localeCompare(b.id);

export const floorConfig = {
  [FloorId.P1]: P1config.sort(compareIds),
  [FloorId.P2]: P2config.sort(compareIds),
  [FloorId.P3]: P3config.sort(compareIds),
  [FloorId.P4]: P4config.sort(compareIds),
};

export const searchById = (floorId: FloorId, id: string): FloorConfig | undefined => {
  const configs = floorConfig[floorId];
  let left = 0;
  let right = configs.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midId = configs[mid].id;

    if (midId === id) {
      return configs[mid];
    } else if (midId < id) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return undefined;
};
