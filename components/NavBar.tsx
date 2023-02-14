import Router from "next/router";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import styles2 from "../styles/events.module.css";
import Link from "next/link";

export default function NavBar(props) {
  const [category, setCategory] = useState<string>("wildfires");
  const [limit, setLimit] = useState<number>(props.limit);

  //   if (limit > 24) {
  //     setLimit(24);
  //   }
  const sendProps = () => {
    Router.push({
      pathname: "/Events",
      query: { limit, category },
    });
  };
  useEffect(() => {
    sendProps();
  }, [props.limit, limit]);

  return (
    <div className={styles.navigation}>
      <div className="btn-group">
        <button
          className={`btn btn-secondary dropdown-toggle ${styles2.btn}`}
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
              onClick={() => setCategory("wildfires")}
            >
              Wildfire
            </a>
          </li>

          <li>
            <a
              href="##"
              className="dropdown-item"
              onClick={() => setCategory("volcanoes")}
            >
              Volcanoes
            </a>
          </li>
        </ul>
      </div>
      <div className="dropdown">
        <button
          className={`btn btn-secondary dropdown-toggle ${styles2.btn}`}
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
              onClick={() => props.setLimit(6)}
            >
              6
            </a>
          </li>
          <li>
            <a
              href="##"
              className="dropdown-item"
              onClick={() => props.setLimit(12)}
            >
              12
            </a>
          </li>
          <li>
            <a
              href="##"
              className="dropdown-item"
              onClick={() => props.setLimit(24)}
            >
              24
            </a>
          </li>
        </ul>
      </div>
      <nav>
        <ul>
          <li>
            <div className={styles2.seeEventsContainer}>
              <Link className={styles2.seeEvents} href="/Events">
                See events
              </Link>
              <Link className={styles2.seeEvents} href="/Events">
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
