import { useRouter } from "next/router";
import styles from "../styles/events.module.css";
import Image from "next/image";
import NavBar from "../components/NavBar";

export default function Event() {
  const router = useRouter();
  const { id, lat, lon, encodeImg, title } = router.query;
  const url: string = decodeURIComponent(encodeImg as string);
  const zoom = 7000;
  console.log({ lat });
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
          src={url}
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
