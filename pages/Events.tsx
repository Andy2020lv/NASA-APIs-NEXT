import { useRouter } from "next/router";
import EventsComp from "../components/EventsComp";
import NavBar from "../components/NavBar";
import { fetchEonetsNasa } from "../lib/fetchNasaAPIs";
import { useState } from "react";

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

export default function Events({
  nasaData,
  category,
  limit,
}: {
  nasaData: EONETEvent;
  category: string;
  limit: number;
}) {
  const router = useRouter();

  const [Limit, setLimit] = useState(limit);
  const [Category, setCategory] = useState(category);

  const handleChange = (newValue: string | number) => {
    if (typeof newValue === "string") {
      setCategory(newValue);
      router.push({
        pathname: "/Events",
        query: { ...router.query, category: newValue },
      });
    } else {
      setLimit(newValue);
      router.push({
        pathname: "/Events",
        query: { ...router.query, limit: newValue },
      });
    }
  };

  const nasaEvents = nasaData?.events.map((element) => (
    <EventsComp
      key={element.id}
      category={category}
      id={element.id}
      coordinates={element.geometry[0].coordinates}
      date={element.geometry[0].date}
      title={element.title}
    />
  ));

  return (
    <>
      <NavBar handleChange={handleChange} />
      <div className="row"> {nasaEvents}</div>
    </>
  );
}

type Query = {
  category?: string;
  limit?: number;
};

export async function getServerSideProps({ query }: { query: Query }) {
  const category = query.category || "wildfires";

  const limit = query.limit ? Math.min(+query.limit, 24) : 6;

  try {
    const nasaData = await fetchEonetsNasa(limit, category);
    return {
      props: {
        nasaData,
        category,
        limit,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        nasaData: null,
        category,
        limit,
      },
    };
  }
}
