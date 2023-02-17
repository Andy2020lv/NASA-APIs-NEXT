import Image from "next/image";
import styles from "../styles/events.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
type Props = {
  category: string;
  coordinates: string[];
  id: string;
  date: string;
  title: string;
};

type earthDataType = {
  id: string;
  resourse: {
    dataset: string;
    planet: string;
  };
  url: string;
};
let lon: string;
let lat: string;
let ParsedDate: string;

export default function EventsComp(props: Props) {
  if (Array.isArray(props.coordinates)) {
    [lon, lat] = props.coordinates!.map((x: string) => x);
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

  let title = props.title;
  let id = props.id;

  return (
    <div className="col-lg-4 col-md-6">
      <div className={styles.events}>
        <h1 style={{ maxWidth: "300px", textAlign: "center" }}>
          {props.title}
        </h1>
        <Image
          src={`${earthData.url}`}
          className={styles.sateliteImg}
          alt="event-img"
          width={300}
          height={200}
          layout="responsive"
        ></Image>
        <div className={styles.eventsCoordinates}>
          <p>Lat: {lat}</p>

          <p>Lon: {lon}</p>
        </div>
        <p>Date: {props.date}</p>
        <nav>
          <Link
            className={styles.goTo}
            href={{
              pathname: "/[event]",
              // Here the first element after 'event' is used to set the value of the [event] dynamic page.
              // This can later be used on 'getstaticpaths'
              query: {
                event: [lat, lon, ParsedDate],
                id,
                title,
              },
            }}
          >
            Go to the image
          </Link>
        </nav>
      </div>
    </div>
  );
}
