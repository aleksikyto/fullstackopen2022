import Weather from "./Weather";

const Country = ({ country }) => {
  return (
    <>
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital} </p>
        <p>area {country.area}</p>
      </div>
      <div>
        <h2>languages:</h2>
        {Object.keys(country.languages).map((obj, i) => {
          return <li key={i}> {country.languages[obj]}</li>;
        })}
      </div>
      <div>
        <img
          src={country.flags.png}
          alt={country.name.common}
          style={{ maxWidth: "100px", paddingTop: "30px" }}
        />
      </div>
      <Weather country={country} />
    </>
  );
};

export default Country;
