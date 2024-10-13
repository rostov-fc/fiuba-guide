import { ReactSearchAutocomplete } from "react-search-autocomplete";
import P1config from "../assets/P1.json";

type Props = {
  onSelectRoom: (room: string | null) => void;
};

type AutocompleteItem = {
  id: string;
  name: string;
  display: string;
  floor: number;
};
const items: AutocompleteItem[] = P1config.reduce(
  (acc: AutocompleteItem[], { id, displayName, searchTerms }) => {
    return [
      ...acc,
      ...searchTerms.map((term) => ({
        id,
        name: term,
        display: displayName,
        floor: 1,
      })),
    ];
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
    onSelectRoom(item.id);
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
