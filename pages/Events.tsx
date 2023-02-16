// import { useRouter } from "next/router";
// import EventsComp from "../components/EventsComp";
// import { useState, useEffect } from "react";
// import NavBar from "../components/NavBar";
// type Props = {
//   category?: string | string[] | undefined;
//   coordinates?: string[];
//   id: string;
//   date?: string;
//   title: string;
//   key: string | number;
//   geometry: [string, string];
// };

// //  type isValidLimit = 6 | 12 | 24

// type EONETEvent = {
//   events: [
//     {
//       id: string;
//       title: string;
//       category: string;
//       geometry: [
//         {
//           date: string;
//           coordinates: [string, string];
//         }
//       ];
//     }
//   ];
// };

// export default function Events() {
//   const router = useRouter();

//   const [category, setCategory] = useState(router.query.category as string);

//   const [limit, setLimit] = useState<number>(
//     typeof router.query.limit === "string" && !isNaN(+router.query.limit)
//       ? +router.query.limit <= 24
//         ? +router.query.limit
//         : 24
//       : 6
//   );

//   const [nasaData, setNasaData] = useState<EONETEvent>();

//   const NASA_API_KEY = "ijz7SNQHjWKEmWblGRlmfPq3nCPhg6LuCNyjZcgb";
//   const EONET_API_URL = `https://eonet.gsfc.nasa.gov/api/v3/events?start=2005-01-01&end=2021-12-31&limit=${
//     limit ? limit : 6
//   }&category=${category ? category : "wildfires"}&key=`;

//   // Fetch the data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(EONET_API_URL + NASA_API_KEY);
//         const data = await response.json();
//         setNasaData(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, [category, limit, EONET_API_URL]);

//   // Return loading while data is not fetched
//   !nasaData && <div>Loading...</div>;

//   // const data =
//   //   typeof router.query.data === "string" ? JSON.parse(router.query.data) : "";

//   const nasaEvents = nasaData?.events.map((element) => (
//     <EventsComp
//       key={element.id}
//       category={category}
//       id={element.id}
//       coordinates={element.geometry[0].coordinates}
//       date={element.geometry[0].date}
//       title={element.title}
//     />
//   ));
//   return (
//     <>
//       <NavBar
//         category={category}
//         setCategory={setCategory}
//         limit={limit}
//         setLimit={setLimit}
//       />
//       <div className="row"> {nasaEvents}</div>
//     </>
//   );
// }
import { useRouter } from "next/router";
import EventsComp from "../components/EventsComp";
import NavBar from "../components/NavBar";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useState } from "react";

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

  const handleChange = (newValue) => {
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
      <div className={styles.navigation}>
        <div className="btn-group">
          <button
            className={`btn btn-secondary dropdown-toggle ${styles.btn}`}
            type="button"
            data-bs-toggle="dropdown"
            data-bs-auto-close="true"
            aria-expanded="false"
            style={{ margin: "1rem" }}
          >
            Categories
          </button>

          <ul className="dropdown-menu">
            <li>
              <a
                href="##"
                className="dropdown-item"
                onClick={() => {
                  handleChange("wildfires");
                }}
              >
                Wildfire
              </a>
            </li>

            <li>
              <a
                href="##"
                className="dropdown-item"
                onClick={() => {
                  handleChange("volcanoes");
                }}
              >
                Volcanoes
              </a>
            </li>
          </ul>
        </div>
        <div className="dropdown">
          <button
            className={`btn btn-secondary dropdown-toggle ${styles.btn}`}
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Amount of events
          </button>
          <ul className="dropdown-menu">
            <li>
              <a
                href="##"
                className="dropdown-item"
                onClick={() => {
                  handleChange(6);
                }}
              >
                6
              </a>
            </li>
            <li>
              <a
                href="##"
                className="dropdown-item"
                onClick={() => {
                  handleChange(12);
                }}
              >
                12
              </a>
            </li>
            <li>
              <a
                href="##"
                className="dropdown-item"
                onClick={() => {
                  handleChange(24);
                }}
              >
                24
              </a>
            </li>
          </ul>
        </div>
        <nav>
          <ul>
            <li>
              <div className={styles.seeEventsContainer}>
                <Link className={styles.seeEvents} href="/Events">
                  See events
                </Link>
                <Link className={styles.seeEvents} href="/PicDay">
                  Pic/day
                </Link>
              </div>
            </li>
          </ul>
          {/* Might need to change the Link tag to an anchor tag because of some issue when going back in page history opn browser. */}
        </nav>
      </div>
      <div className="row"> {nasaEvents}</div>
    </>
  );
}

export async function getServerSideProps({ query }: any) {
  console.log({ query });
  const NASA_API_KEY = "ijz7SNQHjWKEmWblGRlmfPq3nCPhg6LuCNyjZcgb";
  const category = query.category || "wildfires";
  // const [category, setCategory] = useState(router.query.category as string);

  const limit = query.limit ? Math.min(+query.limit, 24) : 6;
  const EONET_API_URL = `https://eonet.gsfc.nasa.gov/api/v3/events?start=2005-01-01&end=2021-12-31&limit=${limit}&category=${category}&key=${NASA_API_KEY}`;

  try {
    const response = await fetch(EONET_API_URL);
    const nasaData = await response.json();
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
