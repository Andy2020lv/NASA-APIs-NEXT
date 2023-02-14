import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/PicDay.module.css";
import NavBar from "../components/NavBar";
type APOD = {
  date: string;
  url: string;
  title: string;
  explanation: string;
};

export default function PicDay() {
  const [response, setResponse] = useState<APOD>();
  const NASA_API_KEY = "ijz7SNQHjWKEmWblGRlmfPq3nCPhg6LuCNyjZcgb";

  async function getAPOD() {
    try {
      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
      );
      const result = await res.json();
      setResponse(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAPOD();
  }, []);

  if (!response) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      {" "}
      <NavBar />
      <div className={styles.picDayContainer}>
        {" "}
        <h1 className="pic-day-title">
          {response.title} ({response.date})
        </h1>
        <div className={styles.picDayExpImg}>
          <p className={styles.picDayExp}>{response.explanation}</p>
          <Image
            className={styles.picDayImg}
            src={response.url}
            alt={response.title}
            width={400}
            height={400}
          />
        </div>
        <div className={styles.picDayLink}>
          <a
            className="go-to"
            rel="noreferrer"
            target="_blank"
            href={response.url}
          >
            See full image
          </a>
        </div>
      </div>
    </>
  );
}
