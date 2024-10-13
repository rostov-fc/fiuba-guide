import { useState } from "react";
import { Floor } from "./components/Floor";
import { RoomSearchData, SearchBar } from "./components/SearchBar";

function App() {
  const [selectedRoom, setSelectedRoom] = useState<RoomSearchData | null>(null);

  return (
    <div>
      <SearchBar onSelectRoom={setSelectedRoom}/>
      <Floor selectedRoom={selectedRoom} />
    </div>
  );
}

export default App;
