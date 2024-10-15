import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { FloorConfig, floorConfig } from "../assets/floorConfig";
import { FloorId, floorIdStrToEnum } from "../types/FloorId";
import { Floor } from "./Floor";
import "./SearchBar.css"

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
  const { name, display, floor } = item;

  if (name === display) {
    return (
      <div className="result-cointainer">
        <div>
          {name} [Piso {floor}]
        </div>
        <div className="floor-mini">
          <Floor selectedRoom={{ floorId: item.floor, room: item.id }} />
        </div>
      </div>
    );
  }
  return (
    <div className="result-cointainer">
      <div>
        {item.name} ({item.display}) [Piso {floor}]
      </div>
      <div className="floor-mini">
        <Floor selectedRoom={{ floorId: item.floor, room: item.id }} />
      </div>
    </div>
  );
};

export const SearchBar = ({ onSelectRoom }: Props) => {
  const onSelect = (item: AutocompleteItem) => {
    onSelectRoom({ floorId: item.floor, room: item.id });
  };

  return (
    <ReactSearchAutocomplete
      className="search-bar"
      items={items}
      onSelect={onSelect}
      formatResult={formatResult}
      showNoResultsText="Sin resultados"
      placeholder="Aula"
      styling={{
        borderRadius: "5px",
        border: "1px solid #5d737e",
        color: "#3f4045",
        backgroundColor: "#fcfcfc",
        iconColor: "#5d737e",
        placeholderColor: "#5d737e",
        hoverBackgroundColor: "#d1d1d1"
      }}
    />
  );
};
