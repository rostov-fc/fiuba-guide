import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { FloorConfig, floorConfig } from "../assets/floorConfig";
import { FloorId, floorIdStrToEnum } from "../types/FloorId";

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
      <span>
        {name} [Piso {floor}]
      </span>
    );
  }
  return (
    <span>
      {item.name} ({item.display}) [Piso {floor}]
    </span>
  );
};

export const SearchBar = ({ onSelectRoom }: Props) => {
  const onSelect = (item: AutocompleteItem) => {
    onSelectRoom({floorId: item.floor, room: item.id});
  };

  return (
    <ReactSearchAutocomplete
      items={items}
      onSelect={onSelect}
      formatResult={formatResult}
      showNoResultsText="Sin resultados"
    />
  );
};
