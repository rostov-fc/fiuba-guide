import { FloorId } from "../types/FloorId";

type Props = {
    floorId: FloorId;
}

export const FloorDisplayName = ({ floorId }: Props) => {
    return (
        getDisplayName(floorId)
    )
}

function getDisplayName(floorId: FloorId): JSX.Element {
    switch (floorId) {
        case FloorId.P1:
            return <div>1<sup>er</sup> Piso</div>
        case FloorId.P2:
            return <div>2<sup>do</sup> Piso</div>
        case FloorId.P3:
            return <div>3<sup>er</sup> Piso</div>
        case FloorId.P4:
            return <div>4<sup>to</sup> Piso</div>
    }
}