type earthDataType = {
  id: string;
  resourse: {
    dataset: string;
    planet: string;
  };
  url: string;
};
const NASA_API_KEY = process.env.NASA_API_KEY;

export async function fetchEarthNasa(
  lon: string,
  lat: string,
  date: string
): Promise<earthDataType> {
  const EARTH_API_URL = `https://api.nasa.gov/planetary/earth/assets?lon=${lon}&lat=${lat}&date=${date}&dim=0.15&&api_key=`;

  try {
    const response = await fetch(EARTH_API_URL + NASA_API_KEY);

    if (!response.ok) {
      throw new Error(`Failed to fetch data from NASA API: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(`Failed to fetch data from NASA API: ${error.message}`);
  }
}

export async function fetchEonetsNasa(limit?: number, category?: string) {
  const EONET_API_URL =
    limit && category
      ? `https://eonet.gsfc.nasa.gov/api/v3/events?start=2005-01-01&end=2021-12-31&limit=${limit}&category=${category}&key=`
      : "https://eonet.gsfc.nasa.gov/api/v3/events?key=";

  try {
    const response = await fetch(EONET_API_URL + NASA_API_KEY);

    if (!response.ok) {
      throw new Error(`Failed to fetch data from NASA API: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(`Failed to fetch data from NASA API: ${error.message}`);
  }
}
