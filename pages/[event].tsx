import { useRouter } from "next/router";
import styles from "../styles/events.module.css";
import Image from "next/image";
import NavBar from "../components/NavBar";
import { fetchEarthNasa, fetchEonetsNasa } from "../lib/fetchNasaAPIs";

type EONETEvent = {
  id: string;
  title: string;
  category: string;
  geometry: [
    {
      date: string;
      coordinates: [string, string];
    }
  ];
};
type Props = {
  imgUrl: string;
};

type Params = {
  event: string;
};
type Context = {
  params: Params;
};
export default function Event(props: Props) {
  const router = useRouter();
  const { title, id } = router.query;
  // const [lat, lon, ParsedDate] = router.query.event!.split(",");
  const event = router.query.event;
  const [lat, lon, ParsedDate] = Array.isArray(event)
    ? event[0].split(",")
    : event!.split(",");

  // console.log({ router });
  // const url: string = decodeURIComponent(encodeImg as string);
  const zoom = 7000;
  // console.log("This is the url" + props.imgUrl);
  return (
    <>
      {" "}
      <NavBar />
      <div className={styles.event}>
        {" "}
        <h5>Id: {id}</h5>
        <h4>Title: {title}</h4>
        <Image
          style={{ margin: "20px" }}
          width={400}
          height={400}
          alt="Event-img"
          src={props.imgUrl}
        />
        <h5>
          Lat: {lat} Lon: {lon}
        </h5>
        <a
          className={styles.goTo}
          rel="noreferrer"
          target="_blank"
          href={`https://earth.google.com/web/@${lat},${lon},${zoom}d,0,0,0`}
        >
          See on Google Earth!
        </a>
      </div>
    </>
  );
}

export async function getStaticProps(context: Context) {
  const [lat, lon, ParsedDate] = context.params.event.split(",");

  const earthData = await fetchEarthNasa(lon, lat, ParsedDate);
  const imgUrl = earthData.url;

  return { props: { imgUrl } };
}

export async function getStaticPaths() {
  const wildfiresData = await fetchEonetsNasa(24, "wildfires");
  const volcanoesData = await fetchEonetsNasa(24, "volcanoes");

  const wildfiresPaths = wildfiresData.events.map((event: EONETEvent) => {
    return {
      params: {
        event: `${event.geometry[0].coordinates[1]},${
          event.geometry[0].coordinates[0]
        },${event.geometry[0].date.slice(0, 10)}`,
      },
    };
  });

  const volcanoesPaths = volcanoesData.events.map((event: EONETEvent) => {
    return {
      params: {
        event: `${event.geometry[0].coordinates[1]},${
          event.geometry[0].coordinates[0]
        },${event.geometry[0].date.slice(0, 10)}`,
      },
    };
  });

  const paths = [...wildfiresPaths, ...volcanoesPaths];

  return {
    paths,
    fallback: false,
  };
}
