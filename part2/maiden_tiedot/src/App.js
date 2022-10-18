import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Country from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState([{}]);
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const countriesToShow = countries?.filter((country) =>
    country?.name?.common.toLowerCase().match(newFilter.toLowerCase())
  );

  return (
    <div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      {countriesToShow.length <= 10 && countriesToShow.length > 1 ? (
        countriesToShow.map((country, i) => {
          return <li key={i}> {country.name.common} </li>;
        })
      ) : countriesToShow.length === 1 ? (
        <Country country={countriesToShow[0]} />
      ) : (
        <p>Too many matches, specify another file</p>
      )}
    </div>
  );
};

export default App;
