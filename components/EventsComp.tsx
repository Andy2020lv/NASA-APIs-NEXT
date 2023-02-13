import Image from "next/image";
import styles from "../styles/events.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
type Props = {
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
let lon: String;
let lat: String;
let ParsedDate: String;
export default function EventsComp(props: Props) {
  if (Array.isArray(props.coordinates)) {
    [lon, lat] = props.coordinates!.map((x: String) => x);
  }
  if (typeof props.date === "string") {
    ParsedDate = props.date.slice(0, 10);
  }

  const EARTH_API_URL = `https://api.nasa.gov/planetary/earth/assets?lon=${lon}&lat=${lat}&date=${ParsedDate}&dim=0.15&&api_key=`;
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
  }, [EARTH_API_URL]);
  if (!earthData) {
    return <p>Loading...</p>;
  }
  const endoceImg = encodeURIComponent(earthData.url);
  // console.log({ earthData });
  // console.log(router.query.data);
  console.log(earthData);
  return (
    <div className="col-lg-4">
      <div className={styles.events}>
        <h1>{props.title}</h1>
        <Image
          src={`${earthData.url}`}
          className={styles.sateliteImg}
          alt="event-img"
          width={200}
          height={200}
        ></Image>
        <div className={styles.eventsCoordinates}>
          <p>Lat: {lat}</p>

          <p>Lon: {lon}</p>
        </div>
        <p>Date: {props.date}</p>
      </div>
    </div>
  );
}
