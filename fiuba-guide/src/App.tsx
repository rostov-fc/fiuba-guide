import { useState } from "react";
import { Floor } from "./components/Floor";
import { RoomSearchBar } from "./components/RoomSearchBar";
import { RoomSearchData } from "./Floors";

function App() {
  const [selectedRoom, setSelectedRoom] = useState<RoomSearchData | null>(null);

  return (
    <div className="canvas">
      <div className="main-bar">
        <RoomSearchBar onSelectRoom={setSelectedRoom} />
      </div>
      <div className="floor-map">
        <Floor selectedRoom={selectedRoom} />
      </div>
    </div>
  );
}

export default App;
