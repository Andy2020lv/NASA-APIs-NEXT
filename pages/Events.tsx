import { setegid } from "process";
import Image from "next/image";
import styles from "../styles/events.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { type } from "os";
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
export default function Events() {
  const router = useRouter();
  // typeof router.query.data === "string"
  //   ? console.log(JSON.parse(router.query.data))
  //   : console.log("This is not a string", typeof router.query.data);
  const data =
    typeof router.query.data === "string" ? JSON.parse(router.query.data) : "";

  console.log({ data });
  const {
    query: { category, coordinates, id, date, title },
  } = router;
  console.log(data[0]?.categories[0].id);
  if (Array.isArray(router.query.coordinates)) {
    [lon, lat] = router.query.coordinates!.map((x: String) => x);
  }
  if (typeof date === "string") {
    const ParsedDate = date.slice(0, 10);
  }

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
  }, [EARTH_API_URL]);
  if (!earthData) {
    return <p>Loading...</p>;
  }
  const endoceImg = encodeURIComponent(earthData.url);
  // console.log({ earthData });
  // console.log(router.query.data);

  return (
    <div className="col-lg-4">
      <div className="events">
        <h1>{title}</h1>
        <Image
          src={`${earthData.url}`}
          className={styles.sateliteImg}
          alt="event-img"
          width={200}
          height={200}
        ></Image>
        <h1>props: {router.query.data}</h1>
      </div>
    </div>
  );
}
