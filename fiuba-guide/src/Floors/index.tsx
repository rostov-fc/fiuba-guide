import { FloorId } from "../types/FloorId";
import P1 from "./P1";
import P2 from "./P2";
import P3 from "./P3";
import P4 from "./P4";

export type RoomSearchData = {
  floorId: FloorId;
  room: string;
  element: JSX.Element;
};

export const floors: Record<FloorId, RoomSearchData> = {
  [FloorId.P1]: {
    floorId: FloorId.P1,
    room: FloorId.P1,
    element: <P1 />,
  },
  [FloorId.P2]: {
    floorId: FloorId.P2,
    room: FloorId.P2,
    element: <P2 />,
  },
  [FloorId.P3]: {
    floorId: FloorId.P3,
    room: FloorId.P3,
    element: <P3 />,
  },
  [FloorId.P4]: {
    floorId: FloorId.P4,
    room: FloorId.P4,
    element: <P4 />,
  },
};
