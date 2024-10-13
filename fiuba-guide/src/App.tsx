import { useState } from "react";
import { Floor } from "./components/Floor";
import { SearchBar } from "./components/SearchBar";
import { FloorId } from "./types/FloorId";

function App() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  return (
    <div>
      <SearchBar onSelectRoom={setSelectedRoom} />
      <Floor id={FloorId.P1} selectedRoom={selectedRoom} />
    </div>
  );
}

export default App;
