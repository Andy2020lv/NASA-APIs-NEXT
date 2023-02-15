import Router from "next/router";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { send } from "process";
type Props = {
  limit?: number;
  setLimit?: Function;
  category?: string;
  setCategory?: Function;
};

export default function NavBar(props: Props) {
  const [category, setCategory] = useState<string>("wildfires");
  const [limit, setLimit] = useState<number>(props.limit!);

  const sendProps = () => {
    Router.push({
      pathname: "/Events",
      query: { limit, category },
    });
  };
  //   useEffect(() => {
  //     sendProps();
  //   }, [sendProps]);

  return (
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
                props.setCategory && props.setCategory!("wildfires");
                sendProps();
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
                props.setCategory && props.setCategory!("volcanoes");
                sendProps();
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
                props.setLimit && props.setLimit(6);
                sendProps();
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
                props.setLimit && props.setLimit(12);
                sendProps();
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
                props.setLimit && props.setLimit(24);
                sendProps();
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
  );
}
