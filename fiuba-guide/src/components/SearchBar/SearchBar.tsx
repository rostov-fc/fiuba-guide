import { useState, useEffect, useRef } from 'react';
import '../../common.css';
import '../../input.css';
import '../../dropdown.css';

type Props<T> = {
  onSelect: (item: T) => void;
  getOptionLabel: (option: T) => string;
  groupBy: (option: T) => string;
  renderOption: (option: T) => JSX.Element;
  searcher: (query: string) => Promise<T[]>;

  placeholder?: string;
  renderLoading?: JSX.Element;
  renderNoResults?: JSX.Element;
  renderGroup?: (group: string) => JSX.Element;
};

export const SearchBar = <T,>({
  placeholder,
  renderLoading,
  renderNoResults,
  getOptionLabel,
  groupBy,
  renderOption,
  searcher,
  onSelect,
  renderGroup
}: Props<T>) => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);

  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query) {
      setLoading(true);
      setError(null);
      searcher(query)
        .then((data) => {
          setResults(data);
          setLoading(false);
          setShowResults(true);
        })
        .catch(() => {
          setError('Error fetching results');
          setLoading(false);
        });
    } else {
      setResults([]);
    }
  }, [query, searcher]);

  const groupedResults = groupResults(results, groupBy);

  const handleClickOutside = (event: MouseEvent) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
      setShowResults(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="search-bar" ref={searchBarRef}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder ? placeholder : "Search..."}
        onFocus={() => setShowResults(true)}
        className={`input searchable ${((loading || error) || (showResults && query !== "")) ? "open" : ""}`}
      />

      {loading && (renderLoading ? renderLoading : <div className='info'>Loading...</div>)}
      {error && <div>{error}</div>}

      {
        showResults && !loading && !error && query !== "" && (
          <div className='dropdown-container'>
            <div className="dropdown">
              {results.length > 0 ? Object.entries(groupedResults).map(([group, options]) => (
                <div key={group}>
                  <div className="bordered-vertical vertical-padding-medium centered emphasis">{renderGroup ? renderGroup(group) : group}</div>
                  <div className='dropdown-options-container'>
                    {options.map((option) => (
                      <div key={getOptionLabel(option)} className="searchable clickable" onClick={() => {
                        onSelect(option);
                        setShowResults(false);
                        setQuery("");
                      }}>
                        {renderOption(option)}
                      </div>
                    ))}
                  </div>
                </div>
              )) : renderNoResults ? renderNoResults : <div className='vertical-padding-large centered emphasis'>No Results</div>}
            </div>
          </div>

        )
      }
    </div >
  );
};

const groupResults = <T,>(results: T[], groupBy: (option: T) => string) => results.reduce<{ [key: string]: T[] }>((acc, option) => {
  const group = groupBy(option);
  if (!acc[group]) {
    acc[group] = [];
  }
  acc[group].push(option);
  return acc;
}, {});