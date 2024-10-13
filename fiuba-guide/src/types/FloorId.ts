export enum FloorId {
  P1 = "P1",
  P2 = "P2",
  P3 = "P3",
  P4 = "P4",
}

export function floorIdStrToEnum(floorId: string): FloorId {
  switch (floorId) {
    case "P1":
      return FloorId.P1;
    case "P2":
      return FloorId.P2;
    case "P3":
      return FloorId.P3;
    case "P4":
      return FloorId.P4;
    default:
      throw new Error(`Invalid Floor Id: ${floorId}`)
  }
} 