import { useRouter } from "next/router";
import EventsComp from "../components/EventsComp";
import { useState, useEffect } from "react";
type Props = {
  category?: string | string[] | undefined;
  coordinates?: string[];
  id: string;
  date?: string;
  title: string;
  key: string | number;
  geometry: [string, string];
};

type EONETEvent = {
  events: [
    {
      id: string;
      title: string;
      geometry: [
        {
          date: string;
          coordinates: [string, string];
        }
      ];
    }
  ];
};

export default function Events() {
  const router = useRouter();

  const category: string | string[] | undefined = router.query.category;

  const limit = router.query.limit;

  const [nasaData, setNasaData] = useState<EONETEvent>();

  const NASA_API_KEY = "ijz7SNQHjWKEmWblGRlmfPq3nCPhg6LuCNyjZcgb";
  const EONET_API_URL = `https://eonet.gsfc.nasa.gov/api/v3/events?start=2005-01-01&end=2021-12-31&limit=${limit}&category=${category}&key=`;

  // Fetch the data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(EONET_API_URL + NASA_API_KEY);
        const data = await response.json();
        setNasaData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [category, limit, EONET_API_URL]);

  // Return loading while data is not fetched
  !nasaData && <div>Loading...</div>;

  // const data =
  //   typeof router.query.data === "string" ? JSON.parse(router.query.data) : "";

  const nasaEvents = nasaData?.events.map((element, index) => (
    <EventsComp
      key={+element.id + index}
      category={category}
      id={element.id}
      coordinates={element.geometry[0].coordinates}
      date={element.geometry[0].date}
      title={element.title}
    />
  ));

  // console.log({ data });

  // console.log(data[0]?.categories[0].id);
  // if (Array.isArray(router.query.coordinates)) {
  //   [lon, lat] = data.coordinates!.map((x: String) => x);
  // }
  // if (typeof data.geometry.date === "string") {
  //   ParsedDate = data.geometry.date.slice(0, 10);
  // }

  // console.log({ earthData });
  // console.log(router.query.data);
  return <div className="row">{nasaEvents}</div>;
}
