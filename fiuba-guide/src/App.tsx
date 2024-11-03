import { useState } from "react";
import { Floor } from "./components/Floor";
import { RoomSearchData, RoomSearchBar } from "./components/RoomSearchBar";
import { FloorSelector } from "./components/FloorSelector/FloorSelector";

function App() {
  const [selectedRoom, setSelectedRoom] = useState<RoomSearchData | null>(null);

  return (
    <div className="canvas">
      <div className="main-bar">
        <RoomSearchBar onSelectRoom={setSelectedRoom} />
      </div>
      <div className="floor-map">
        <FloorSelector selectedRoom={selectedRoom} onFloorChange={(floor) => { setSelectedRoom({ floorId: floor }) }} />
        <Floor selectedRoom={selectedRoom} />
      </div>

    </div>
  );
}

export default App;
