import Alert from "./Alert";
import styles from "../styles/Home.module.css";
import Link from "next/link";
type Props = {
  handleChange?: (newValue: string | number) => void;
};

export default function NavBar({ handleChange }: Props) {
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
                handleChange!("wildfires");
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
                handleChange!("volcanoes");
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
                handleChange!(6);
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
                handleChange!(12);
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
                handleChange!(24);
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
          </li>{" "}
        </ul>

        {/* Might need to change the Link tag to an anchor tag because of some issue when going back in page history opn browser. */}
      </nav>
      <div className={styles.AlertContainer}>
        {" "}
        <Alert />
      </div>
    </div>
  );
}
