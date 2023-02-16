import { useRouter } from "next/router";
import EventsComp from "../components/EventsComp";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
type Props = {
  category?: string | string[] | undefined;
  coordinates?: string[];
  id: string;
  date?: string;
  title: string;
  key: string | number;
  geometry: [string, string];
};

//  type isValidLimit = 6 | 12 | 24

type EONETEvent = {
  events: [
    {
      id: string;
      title: string;
      category: string;
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

  const [category, setCategory] = useState(router.query.category as string);

  const [limit, setLimit] = useState<number>(
    typeof router.query.limit === "string" && !isNaN(+router.query.limit)
      ? +router.query.limit <= 24
        ? +router.query.limit
        : 24
      : 6
  );

  const [nasaData, setNasaData] = useState<EONETEvent>();

  const NASA_API_KEY = "ijz7SNQHjWKEmWblGRlmfPq3nCPhg6LuCNyjZcgb";
  const EONET_API_URL = `https://eonet.gsfc.nasa.gov/api/v3/events?start=2005-01-01&end=2021-12-31&limit=${
    limit ? limit : 6
  }&category=${category ? category : "wildfires"}&key=`;

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
  return (
    <>
      <NavBar
        category={category}
        setCategory={setCategory}
        limit={limit}
        setLimit={setLimit}
      />
      <div className="row"> {nasaEvents}</div>
    </>
  );
}
