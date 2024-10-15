import { useState } from "react";
import { Floor } from "./components/Floor";
import { RoomSearchData, SearchBar } from "./components/SearchBar";

function App() {
  const [selectedRoom, setSelectedRoom] = useState<RoomSearchData | null>(null);

  return (
    <div className="canvas">
      <div className="main-bar">
        <SearchBar onSelectRoom={setSelectedRoom} />
      </div>
      <div className="floor-map">
        <Floor selectedRoom={selectedRoom} />
      </div>
    </div>
  );
}

export default App;
