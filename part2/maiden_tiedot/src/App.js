import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Country from "./components/Country";
import Button from "./components/Button";

const App = () => {
  const [countries, setCountries] = useState([{}]);
  const [newFilter, setNewFilter] = useState("");
  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    const countriesToShow = () => {
      return countries?.filter((country) =>
        country?.name?.common.toLowerCase().match(newFilter.toLowerCase())
      );
    };
    setSelectedCountries(countriesToShow());
  }, [newFilter, countries]);

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const handleClick = (name) => {
    const selected = countries.filter((country) =>
      country?.name?.common.toLowerCase().match(name.toLowerCase())
    );
    setSelectedCountries(selected);
  };

  return (
    <div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      {selectedCountries.length <= 10 && selectedCountries.length > 1 ? (
        selectedCountries.map((country, i) => {
          return (
            <div key={i}>
              {country.name.common}
              <Button handleClick={handleClick} name={country.name.common} />
            </div>
          );
        })
      ) : selectedCountries.length === 1 ? (
        <Country country={selectedCountries[0]} />
      ) : (
        <p>Too many matches, specify another file</p>
      )}
    </div>
  );
};

export default App;
