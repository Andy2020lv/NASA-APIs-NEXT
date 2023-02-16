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
  const [lat, lon, ParsedDate] = router.query.event!.split(",");

  console.log({ router });
  // const url: string = decodeURIComponent(encodeImg as string);
  const zoom = 7000;
  console.log("This is the url" + props.imgUrl);
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

export async function getStaticProps(context) {
  // TRY TO USE USEROUTER TO CATCH THE VARIABLES FROM CONTEXT.QUERY
  const [lat, lon, ParsedDate] = context.params.event.split(",");
  console.log({ lat, lon, ParsedDate });
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
  return {
    paths: [
      { params: { event: "39.95983,-105.19282,2021-12-30" } },
      { params: { event: "34.396954841,-117.729843629,2021-12-12" } },
      { params: { event: "33.417201559,-110.861196043,2021-11-27" } },
      { params: { event: "352.076,-176.13,2021-10-19" } },
      { params: { event: "-7.54,110.446,2021-01-07" } },
      { params: { event: "29.63,129.71,2020-07-12" } },
    ],
    fallback: true,
  };
}
