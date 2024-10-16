import { FloorConfig, floorConfig } from "../assets/floorConfig";
import { FloorId, floorIdStrToEnum } from "../types/FloorId";
import { Floor } from "./Floor";
import { FloorDisplayName } from "./FloorDisplayName";
import "./RoomSearchBar.css"
import { SearchBar } from "./SearchBar/SearchBar";

export type RoomSearchData = {
  floorId: FloorId;
  room: string;
}

type Props = {
  onSelectRoom: (room: RoomSearchData | null) => void;
};

type AutocompleteItem = {
  id: string;
  name: string;
  display: string;
  floor: FloorId;
};

const deNormalizeFloor = (
  config: FloorConfig[],
  floor: FloorId
): AutocompleteItem[] =>
  config.reduce((acc: AutocompleteItem[], { id, displayName, searchTerms }) => {
    return [
      ...acc,
      ...searchTerms.map((term) => ({
        id,
        name: term,
        display: displayName,
        floor,
      })),
    ];
  }, []);

const items = Object.entries(floorConfig).reduce(
  (acc: AutocompleteItem[], [id, config]) => {
    return [...acc, ...deNormalizeFloor(config, floorIdStrToEnum(id))];
  },
  []
);

const formatResult = (item: AutocompleteItem) => {
  const { name, display } = item;

  if (name === display) {
    return (
      <div className="result-cointainer">
        <div>{name}</div>
        <div className="floor-mini">
          <Floor selectedRoom={{ floorId: item.floor, room: item.id }} />
        </div>
      </div>
    );
  }
  return (
    <div className="result-cointainer">
      <div>
        {item.name} ({item.display})
      </div>
      <div className="floor-mini">
        <Floor selectedRoom={{ floorId: item.floor, room: item.id }} />
      </div>
    </div>
  );
};

export const RoomSearchBar = ({ onSelectRoom }: Props) => {
  const onSelect = (item: AutocompleteItem) => {
    onSelectRoom({ floorId: item.floor, room: item.id });
  };

  return (
    <div className="room-search-bar">
      <SearchBar<AutocompleteItem>
        onSelect={onSelect}
        getOptionLabel={(option) => option.id}
        groupBy={(option) => option.floor}
        renderOption={formatResult}
        searcher={(query) => new Promise((res) => res(items.filter((room) =>
          room.name.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5)))}
        renderGroup={(floorId) => <FloorDisplayName floorId={floorIdStrToEnum(floorId)} />}
      />
    </div>
  );
};
