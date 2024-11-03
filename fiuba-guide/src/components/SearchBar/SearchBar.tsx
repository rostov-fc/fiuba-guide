import { useState, useEffect, useRef } from "react";
import "../../common.css";
import "../../input.css";
import "../../dropdown.css";

type Props<T> = {
  onSelect: (item: T) => void;
  getOptionLabel: (option: T) => string;
  groupBy: (option: T) => string;
  renderOption: (option: T) => JSX.Element;
  searcher: (query: string) => Promise<T[]>;

  placeholder?: string;
  renderLoading?: JSX.Element;
  renderNoResults?: JSX.Element;
  className?: string;
  renderGroup?: (group: string) => JSX.Element;
};

const DefaultNoResults = () => (
  <div className="vertical-padding-large centered emphasis">No Results</div>
);

export const SearchBar = <T,>({
  placeholder,
  renderLoading,
  renderNoResults,
  className,
  getOptionLabel,
  groupBy,
  renderOption,
  searcher,
  onSelect,
  renderGroup,
}: Props<T>) => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<boolean>(false);

  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query && selected) {
      setLoading(true);
      setError(null);
      searcher(query)
        .then((data) => {
          setResults(data);
          setLoading(false);
        })
        .catch(() => {
          setError("Error fetching results");
          setLoading(false);
        });
    }
  }, [query, searcher]);

  const groupedResults = groupResults(results, groupBy);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchBarRef.current &&
      !searchBarRef.current.contains(event.target as Node)
    ) {
      setSelected(false);
    }
  };

  const selectOption = (option: T) => {
    onSelect(option);
    setSelected(false);
    setQuery("");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const open = loading || error || (selected && query !== "");

  const displayResults = () =>
    Object.entries(groupedResults).map(([group, options]) => (
      <div key={group}>
        <div className="bordered-vertical vertical-padding-medium centered emphasis">
          {renderGroup?.(group) || group}
        </div>
        <div className="dropdown-options-container">
          {options.map((option) => (
            <div
              key={getOptionLabel(option)}
              className="searchable clickable"
              onClick={() => {
                selectOption(option);
              }}
            >
              {renderOption(option)}
            </div>
          ))}
        </div>
      </div>
    ));

  return (
    <div ref={searchBarRef} className={className}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder ? placeholder : "Search..."}
        onFocus={() => setSelected(true)}
        className={`input searchable ${open ? "open" : ""}`}
      />
      {loading ? (
        renderLoading || (
          <div className="dropdown">
            <div className="vertical-padding-large centered emphasis">
              Loading...
            </div>
          </div>
        )
      ) : error ? (
        <div className="dropdown">
          <div className="vertical-padding-large centered emphasis">
            {error}
          </div>
        </div>
      ) : selected && query !== "" ? (
        <div className="dropdown">
          {results.length > 0
            ? displayResults()
            : renderNoResults || <DefaultNoResults />}
        </div>
      ) : null}
    </div>
  );
};

const groupResults = <T,>(results: T[], groupBy: (option: T) => string) =>
  results.reduce<{ [key: string]: T[] }>((acc, option) => {
    const group = groupBy(option);
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(option);
    return acc;
  }, {});
