import axios from "axios";
import { useEffect, useState } from "react";

const Weather = ({ country }) => {
  const [data, setData] = useState();
  const [loadingData, setLoadingData] = useState(true);

  const iconLink = `http://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`;

  useEffect(() => {
    const lat = country?.latlng[0];
    const lon = country?.latlng[1];
    const units = "metric";
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        setData(response.data);
        setLoadingData(!loadingData);
      });
  }, [country]);

  return (
    <>
      {!loadingData && (
        <>
          <h2>Weather in {country?.capital}</h2>
          <p>temperature {data?.main.temp} celsius</p>
          <img src={iconLink} alt="weatherIcon"></img>
          <p>wind {data?.wind.speed} m/s</p>
        </>
      )}
    </>
  );
};

export default Weather;
