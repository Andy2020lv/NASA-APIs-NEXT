import { setegid } from "process";
import { useState, useEffect } from "react";
type Props = {
  key: String;
  category: String;
  coordinates: String[];
  id: String;
  date: String;
  title: String;
};

type earthDataType = {
  id: string;
  resourse: {
    dataset: string;
    planet: string;
  };
  url: string;
};

export default function Events(props: Props) {
  let [lon, lat] = props.coordinates.map((x: String) => x);
  const date = props.date.slice(0, 10);

  const EARTH_API_URL = `https://api.nasa.gov/planetary/earth/assets?lon=${lon}&lat=${lat}&date=${date}&dim=0.15&&api_key=`;
  const NASA_API_KEY = "ijz7SNQHjWKEmWblGRlmfPq3nCPhg6LuCNyjZcgb";

  const [earthData, setEarthData] = useState<earthDataType>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(EARTH_API_URL + NASA_API_KEY);
        const data = await response.json();
        setEarthData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [lon, EARTH_API_URL]);
  if (!earthData) {
    return <p>Loading...</p>;
  }
  console.log({ earthData });

  return <div></div>;
}
