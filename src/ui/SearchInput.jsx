import { useEffect, useState } from "react";

export default function SearchInput({ onClickHandler }) {
  const [searchCityText, setSearchCityText] = useState("");
  const [suggestions, setSuggestions] = useState("");

  const fetchSuggestions = async function (label) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search.php?q=${label}&format=json&addressdetails=1`
    );
    const datas = await response.json();

    const tempSuggestions = [];
    datas.forEach((data) => {
      tempSuggestions.push({
        label: `${data?.name},${data?.address?.state},${data?.address.country}`,
        lat: data.lat,
        lon: data.lon,
      });
    });
    setSuggestions(tempSuggestions);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchSuggestions(searchCityText);
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchCityText]);
  return (
    <header className="header">
      <h1 className="title">Weather</h1>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search city..."
          value={searchCityText}
          onChange={(e) => setSearchCityText(e.target.value)}
        />
        <div className="suggestion">
          {suggestions?.length > 0 &&
            suggestions.map((suggestionItem, suggestionIndex) =>
              suggestionIndex < 2 ? (
                <p
                  className="suggested-label"
                  key={suggestionIndex}
                  onClick={() => onClickHandler(suggestionItem)}
                >
                  {suggestionItem.label}
                </p>
              ) : null
            )}
        </div>
      </div>
    </header>
  );
}
