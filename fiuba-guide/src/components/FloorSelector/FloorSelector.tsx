import { useEffect, useRef, useState } from "react";
import './FloorSelector.css';
import { FloorDisplayName } from "../FloorDisplayName";
import { RoomSearchData } from "../RoomSearchBar";
import { FloorId } from "../../types/FloorId";
import "../../dropdown.css";

type Props = {
    selectedRoom: RoomSearchData | null;
    onFloorChange: (floor: FloorId) => void;
}

export const FloorSelector = ({ selectedRoom, onFloorChange }: Props) => {
    const [selected, setSelected] = useState<boolean>(false);
    const selectorRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
            setSelected(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={`input floor-display ${selected ? "open" : ""}`} ref={selectorRef} onClick={() => setSelected(!selected)}>
            {selected && <div className="vertical-padding-medium subtle floor-display-selector open"><FloorDisplayName floorId={selectedRoom?.floorId || FloorId.P1} /></div>}
            {!selected && <div className="vertical-padding-medium emphasis floor-display-selector"> <FloorDisplayName floorId={selectedRoom?.floorId || FloorId.P1} /></div>}

            {selected && (
                <div className="dropdown dropdown-options-container results">
                    {Object.values(FloorId).map((floorId) =>
                        <div key={floorId} className="vertical-padding-small centered emphasis clickable" onClick={() => onFloorChange(floorId)}><FloorDisplayName floorId={floorId} /></div>
                    )}
                </div>
            )}
        </div >
    );
};

