import { useEffect, useState } from "react";
import styles from "../styles/Alert.module.css";
import LocationSVG from "../public/location";
import { fetchEonetsNasa } from "../lib/fetchNasaAPIs";
type DataType = {
  lat: number;
  lng: number;
  geometry?: [{ date: string; coordinates: [number, number] }];
  title?: string;
  sources?: [{ url: string }];
};
export default function Alert() {
  const [isClose, setIsClose] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventSrc, setevEntSrc] = useState<string>();
  const [eventDistance, setEventDistance] = useState<number>();
  const [eventDate, setEventDate] = useState<string>();

  const [userLocation, setUserLocation] = useState<DataType>();
  const [naturalEvents, setNaturalEvents] = useState([]);

  // Get current date
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
  const day = ("0" + currentDate.getDate()).slice(-2);

  const currentDateString = `${year}-${month}-${day}`;
  const [locationRetrieved, setLocationRetrieved] = useState<boolean>(false);

  const getLocation = () => {
    if (!locationRetrieved) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
      setLocationRetrieved(true);
    } else {
      setUserLocation(undefined); // reset the user's location
      setLocationRetrieved(false);
    }
  };

  useEffect(() => {
    if (userLocation) {
      // Make a request to the NASA EONET API to get a list of natural events

      const fetchData = async () => {
        const data = await fetchEonetsNasa();
        setNaturalEvents(data.events);
      };
      fetchData();
    }
  }, [userLocation]);
  useEffect(() => {
    if (userLocation && naturalEvents.length > 0) {
      // Iterate over the list of natural events, and use the Haversine formula
      // to calculate the distance between each event and the user's location
      naturalEvents.forEach((event: DataType) => {
        const distance = getDistance(
          userLocation.lat,
          userLocation.lng,
          event.geometry![event.geometry!.length - 1].coordinates[1],
          event.geometry![event.geometry!.length - 1].coordinates[0]
        );

        // If the event is within 50km of the user's location/
        if (distance <= 50) {
          // alert(
          //   `There is a natural event within 50km of your location: ${event.title}`
          // );

          setEventDate(
            event.geometry![event.geometry!.length - 1].date.slice(0, 10)
          );

          // If that events date is equal to today's date, display the alert.
          if (eventDate === currentDateString) {
            setIsClose(true);
            setEventName(event.title!);
            setevEntSrc(event.sources![0].url);
            setEventDistance(distance);
          }
        }
      });
    }
  }, [userLocation, naturalEvents, eventDate, currentDateString]);

  function getDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
    const R = 6371; // radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return Number(d.toFixed(1));
  }

  return (
    <div className={styles.AlertContent} style={{ color: "white" }}>
      <div>
        <button className={styles.AlertButton} onClick={() => getLocation()}>
          {<LocationSVG />}Track Events
        </button>
      </div>
      <div>
        {isClose && locationRetrieved && (
          <div className={`alert ${styles.AlertSign}`}>
            {" "}
            <div
              className="alert alert-danger d-flex align-items-center"
              role="alert"
            >
              <div>
                <p>
                  Alert, {eventName} is at {eventDistance}km from you.
                </p>
                <a rel="noreferrer" target="_blank" href={eventSrc}>
                  More info:
                </a>
              </div>
            </div>
          </div>
        )}
        {locationRetrieved && (
          <div className={`alert ${styles.AlertSign}`}>
            {" "}
            <div
              className="alert alert-success d-flex align-items-center"
              role="alert"
            >
              <div>
                <p>There are no events near you.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
