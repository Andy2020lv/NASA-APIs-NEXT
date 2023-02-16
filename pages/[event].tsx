import { useRouter } from "next/router";
import styles from "../styles/events.module.css";
import Image from "next/image";
import NavBar from "../components/NavBar";

type Props = {
  imgUrl: string;
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

export async function getStaticProps(context: any) {
  // TRY TO USE USEROUTER TO CATCH THE VARIABLES FROM CONTEXT.QUERY
  const [lat, lon, ParsedDate] = context.params.event.split(",");
  // console.log({ lat, lon, ParsedDate });
  // console.log(context.params.event.toString().split(","));
  console.log({ context });
  console.log(context.params);

  const EARTH_API_URL = `https://api.nasa.gov/planetary/earth/assets?lon=${lon}&lat=${lat}&date=${ParsedDate}&dim=0.15&&api_key=`;
  const NASA_API_KEY = "ijz7SNQHjWKEmWblGRlmfPq3nCPhg6LuCNyjZcgb";

  const earthDataResponse = await fetch(EARTH_API_URL + NASA_API_KEY);

  const earthData = await earthDataResponse.json();
  // console.log(earthData.url);
  const imgUrl = earthData.url;

  return { props: { imgUrl } };
}

export async function getStaticPaths() {
  const NASA_API_KEY = "ijz7SNQHjWKEmWblGRlmfPq3nCPhg6LuCNyjZcgb";

  const wildfiresURL = `https://eonet.gsfc.nasa.gov/api/v3/events?start=2005-01-01&end=2021-12-31&limit=${24}&category=${"wildfires"}&key=${NASA_API_KEY}`;
  const volcanoesURL = `https://eonet.gsfc.nasa.gov/api/v3/events?start=2005-01-01&end=2021-12-31&limit=${24}&category=${"volcanoes"}&key=${NASA_API_KEY}`;

  const [wildfiresResponse, volcanoesResponse] = await Promise.all([
    fetch(wildfiresURL),
    fetch(volcanoesURL),
  ]);

  const wildfiresData = await wildfiresResponse.json();
  const volcanoesData = await volcanoesResponse.json();

  const wildfiresPaths = wildfiresData.events.map((event: any) => {
    return {
      params: {
        event: `${event.geometry[0].coordinates[1]},${
          event.geometry[0].coordinates[0]
        },${event.geometry[0].date.slice(0, 10)}`,
      },
    };
  });

  const volcanoesPaths = volcanoesData.events.map((event: any) => {
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
