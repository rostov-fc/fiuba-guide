import { useState } from "react";
import { FloorWithGestures } from "./components/Floor";
import { RoomSearchData, RoomSearchBar } from "./components/RoomSearchBar";
import { FloorSelector } from "./components/FloorSelector/FloorSelector";
import { FloorId } from "./types/FloorId";

function App() {
  const [selectedRoom, setSelectedRoom] = useState<RoomSearchData | null>(null);

  return (
    <div className="canvas">
      <div className="main-bar">
        <RoomSearchBar onSelectRoom={setSelectedRoom} />
      </div>
      <div className="floor-map">
        <FloorSelector
          selectedFloor={selectedRoom?.floorId || FloorId.P1}
          onFloorChange={(floor) => {
            setSelectedRoom({ floorId: floor });
          }}
        />
        <FloorWithGestures selectedRoom={selectedRoom} />
      </div>
    </div>
  );
}

export default App;
