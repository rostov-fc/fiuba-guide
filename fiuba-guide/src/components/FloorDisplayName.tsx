import { FloorId } from "../types/FloorId";

type Props = {
  floorId: FloorId;
};

const floorDisplayNameMap: Record<FloorId, JSX.Element> = {
  [FloorId.P1]: (
    <div>
      1<sup>er</sup> Piso
    </div>
  ),
  [FloorId.P2]: (
    <div>
      2<sup>do</sup> Piso
    </div>
  ),
  [FloorId.P3]: (
    <div>
      3<sup>er</sup> Piso
    </div>
  ),
  [FloorId.P4]: (
    <div>
      4<sup>to</sup> Piso
    </div>
  ),
};

export const FloorDisplayName = ({ floorId }: Props) => {
  return floorDisplayNameMap[floorId];
};
